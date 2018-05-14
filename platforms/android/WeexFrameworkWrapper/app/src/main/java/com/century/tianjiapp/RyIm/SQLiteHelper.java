package com.century.tianjiapp.RyIm;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.alibaba.fastjson.JSONArray;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by chencentury on 2018/3/16.
 */

public class SQLiteHelper extends SQLiteOpenHelper {
    public static final String TAG = "RongLog========>";
    /**
     * @param context
     *            上下文
     * @param name
     *            数据库名称
     * @param factory
     *            游标工厂
     * @param version
     *            数据库版本
     */
    public SQLiteHelper(Context context, String name, SQLiteDatabase.CursorFactory factory,
                        int version) {
        super(context, name, factory, version);
    }


    // 创建数据库
    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "数据库创建");
        String sql = "CREATE TABLE IF NOT EXISTS USER_INFO (id varchar(50),ryId,label varchar(50),shortLabel,pid varchar(50),nodeType int,avatarUrl varchar(255))";
        db.execSQL(sql);
    }
    // 数据库更新
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Log.d(TAG, "数据库更新");
    }
    /**
     * 添加Person到数据库
     *
     * @param person
     *            Person
     */
    public void addPerson(Person person) {
        SQLiteDatabase db = getWritableDatabase(); // 以读写的形式打开数据库
        String sql = "INSERT OR REPLACE INTO USER_INFO (id,ryId,label,shortLabel,pid,nodeType,avatarUrl) values("
                + String.format("'%s'", person.getId()) + ","
                + String.format("'%s'", person.getRyId())+ ","
                + String.format("'%s'", person.getLabel())+ ","
                + String.format("'%s'", person.getShortLabel())+ ","
                + String.format("'%s'", person.getPid())+ ","
                + person.getNodeType() + ","
                + String.format("'%s'", person.getAvatarUrl()) +
                ");";
        Log.d(TAG, "插入"+sql);
        db.execSQL(sql); // 插入数据库

        db.close(); // 关闭数据库连接
    }
    /**
     * 更新Person
     *
     * @param person
     *            Person
     */
    public void updatePerson(Person person) {
        Log.d(TAG, "更新");
        SQLiteDatabase db = getWritableDatabase(); // 以读写的形式打开数据库

        String sql = "update USER_INFO set ryId="
                + person.getRyId()
                + ",avatarUrl=" + person.getAvatarUrl()
                + ",label=" + person.getLabel()
                + ",shortLabel=" + person.getShortLabel()
                + ",pid=" + person.getPid()
                + ",nodeType=" + String.format("'%s'", person.getNodeType())
                + " where _id=" + person.getRyId();

        Log.e("updatePerson", sql);
        db.execSQL(sql); // 更新数据库
        db.close(); // 关闭数据库连接
    }
    /**
     * 删除Person
     *
     * @param _id
     *            Person的id
     */
    public void deletePerson(int _id) {
        Log.d(TAG, "删除");
        SQLiteDatabase db = getWritableDatabase(); // 以读写的形式打开数据库
        String sql = "_id = ?";
        String wheres[] = { String.valueOf(_id) };
        db.delete("person", sql, wheres); // 数据库删除
        db.close(); // 关闭数据库
    }

    /**
     * 查询所有的Person
     *
     * @return 所有Person集合
     */
    public JSONArray queryAllPerson(String sql) {
//        List<Person> list = new ArrayList<Person>();
        SQLiteDatabase db = getReadableDatabase(); // 以只读的方式打开数据库
//        String sql = "select id,ryId,label,shortLabel,nodeType,pid,avatarUrl from USER_INFO;";
        Cursor cursor = db.rawQuery(sql, null);
        JSONArray newArray = new JSONArray();
        while (cursor.moveToNext()) {
            Map<String, String> data = new HashMap<>();
            String id = cursor.getString(cursor.getColumnIndex("id"));
            String ryId = cursor.getString(cursor.getColumnIndex("ryId"));
            String label = cursor.getString(cursor.getColumnIndex("label"));
            String shortLabel = cursor.getString(cursor.getColumnIndex("shortLabel"));
            int nodeType = cursor.getInt(cursor.getColumnIndex("nodeType"));
            String pid = cursor.getString(cursor.getColumnIndex("pid"));
            String avatarUrl = cursor.getString(cursor.getColumnIndex("avatarUrl"));
            data.put("id", id);
            data.put("ryId", ryId);
            data.put("label", label);
            data.put("shortLabel", shortLabel);
            data.put("pid", pid);
            data.put("nodeType", String.valueOf(nodeType));
            data.put("avatarUrl", pid);
            newArray.add(data); // 添加到数组
        }
        cursor.close(); // 关闭游标
        db.close(); // 关闭数据库
        return newArray;
    }

    /**
     * 根据id查询Person
     *
     * @param _id
     *            id
     * @return Person
     */
    public Person queryPersonById(String _id) {
        Person person = null;
        SQLiteDatabase db = getReadableDatabase(); // 以只读方式打开数据库
        String[] columns = { "id","ryId", "label", "shortLabel", "nodeType","pid","avatarUrl" };
        String selection = "ryId=?";
        String[] selectionArgs = { _id };
        Cursor cursor = db.query("USER_INFO", columns, selection, selectionArgs,
                null, null, null);
        if(cursor == null){
            return person;
        }
//        Log.d(TAG, "queryPersonById: "+cursor.getCount());
//        if (cursor.moveToNext()) {
        if (cursor.moveToFirst()) {
            person = new Person();
            String id = cursor.getString(cursor.getColumnIndex("id"));
            String label = cursor.getString(cursor.getColumnIndex("label"));
            String shortLabel = cursor.getString(cursor.getColumnIndex("shortLabel"));
            int nodeType = cursor.getInt(cursor.getColumnIndex("nodeType"));
            String pid = cursor.getString(cursor.getColumnIndex("pid"));
            String avatarUrl = cursor.getString(cursor.getColumnIndex("avatarUrl"));
            person.setId(id);
            person.setRyId(_id);
            person.setLabel(label);
            person.setShortLabel(shortLabel);
            person.setNodeType(nodeType);
            person.setPid(pid);
            person.setAvatarUrl(avatarUrl);
        }
        return person;
    }

    public Boolean deleteTable(){
        try{
            SQLiteDatabase db = getWritableDatabase(); // 以读写的形式打开数据库
            String sql = "delete from USER_INFO where 1=1";
            Log.e("deleteTable", sql);
            db.execSQL(sql); // 更新数据库
            db.close(); // 关闭数据库连接
            return true;
        }
        catch (Exception e){
            return false;
        }
    }
}
