package com.century.tianjiapp.Video.Rtsp;

import android.content.Context;
import android.graphics.SurfaceTexture;
import android.opengl.GLSurfaceView;
import android.util.Log;
import android.view.Surface;

import java.nio.ByteBuffer;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

/**
 * Created by chencentury on 2018/3/28.
 */


class VideoSurfaceView extends GLSurfaceView
{
    public abstract interface VideoSurfaceViewCallback
    {
        public void onSurfaceCreated(Surface surface);
    }

    VideoRender mRenderer = null;
    VideoSurfaceViewCallback callback = null;

    public VideoSurfaceView(Context context, VideoSurfaceViewCallback callback)
    {
        super(context);
        setEGLContextClientVersion(2);
        mRenderer = new VideoRender(context, callback);
        setRenderer(mRenderer);
        this.callback = callback;

        Log.i(TAG, "VideoSurfaceView created");
    }

    public Surface getSurface() {
        return mRenderer.getSurface();
    }

    public int getSurfaceWidth() {
        return mRenderer.getWidth();
    }

    public int getSurfaceHeight() {
        return mRenderer.getHeight();
    }

    private ByteBuffer frameBuffer;
    private Runnable getFrameRunnable;

    public ByteBuffer getFrame(final int width, final int height)
    {
        //return mRenderer.getFrame(width, height);
        getFrameRunnable = new Runnable()
        {
            public void run() {
                frameBuffer = mRenderer.getFrame(width, height);

                synchronized (getFrameRunnable) { getFrameRunnable.notifyAll(); }
            }
        };

        queueEvent(getFrameRunnable);

        synchronized (getFrameRunnable)
        {
            try
            {
                getFrameRunnable.wait();
            }
            catch (InterruptedException e)
            {
            }
        }
        return frameBuffer;
    }

    @Override
    public void onResume()
    {
        queueEvent(new Runnable(){
            public void run() {
                //
            }});
        super.onResume();
    }

    /**
     * A GLSurfaceView implementation that wraps TextureRender.  Used to render frames from a
     * video decoder to a View.
     */
    private static class VideoRender implements GLSurfaceView.Renderer, SurfaceTexture.OnFrameAvailableListener
    {
        private TextureRender mTextureRender = null;
        private Surface surface = null;
        private SurfaceTexture mSurfaceTexture = null;
        VideoSurfaceViewCallback callback = null;

        private int width = 0;
        private int height = 0;

        private boolean updateSurface = false;
        public VideoRender(Context context, VideoSurfaceViewCallback callback) {
            mTextureRender = new TextureRender();
            this.callback = callback;
        }

        public Surface getSurface() {
            return surface;
        }

        public int getWidth() {
            return width;
        }

        public int getHeight() {
            return height;
        }

        public ByteBuffer getFrame(int width, int height)
        {
            return mTextureRender.getFrame(width, height);
        }

        public void onDrawFrame(GL10 glUnused) {
            synchronized(this) {
                if (updateSurface) {
                    mSurfaceTexture.updateTexImage();
                    //mTextureRender.getTransformMatrix(mSurfaceTexture);
                    updateSurface = false;
                }
//                else
//                {
//                    return;
//                }
            }
            mTextureRender.drawFrame(mSurfaceTexture);
        }
        public void onSurfaceChanged(GL10 gl, int width, int height) {
            Log.i(TAG, "onSurfaceChanged");
            gl.glViewport(0, 0, width, height);
            this.width = width;
            this.height = height;
        }

        public void onSurfaceCreated(GL10 glUnused, EGLConfig config) {
            Log.i(TAG, "onSurfaceCreated");

            mTextureRender.surfaceCreated();
            /*
             * Create the SurfaceTexture that will feed this textureID,
             * and pass it to the MediaPlayer
             */
            mSurfaceTexture = new SurfaceTexture(mTextureRender.getTextureId());
            mSurfaceTexture.setOnFrameAvailableListener(this);
            surface = new Surface(mSurfaceTexture);

            synchronized(this) {
                updateSurface = false;
            }

            if (callback != null)
                callback.onSurfaceCreated(surface);
        }
        synchronized public void onFrameAvailable(SurfaceTexture surface) {
            updateSurface = true;
        }

        private static String TAG = "VideoRender";

    }  // End of class VideoRender.

    private static final String TAG = "VideoSurfaceView";

}  // End of class VideoSurfaceView.
