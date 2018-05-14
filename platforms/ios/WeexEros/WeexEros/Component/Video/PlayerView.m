//
//  PlayerView.m
//  WeexEros
//
//  Created by chen century on 2018/3/29.
//  Copyright © 2018年 benmu. All rights reserved.
//

#import "PlayerView.h"
#import <MobileVLCKit/MobileVLCKit.h>

@interface PlayerView()

@property (nonatomic, strong) VLCMediaPlayer *vlcPlayer;
@property (strong,nonatomic) NSString *playUrl;
@end

@implementation PlayerView

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    _instance = weexInstance;
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
//        if(attributes[@"playUrl"]){
//            self.playUrl = [WXConvert NSString:attributes[@"playUrl"]];
//        }
    }
    
    return self;
}

//- (UIView *)loadView {
//    UIView *mview = [[UIView alloc]init];
//    _np = [[NodePlayer alloc] init];
//    _np.nodePlayerDelegate = self;//代理触发链接回调
//    [_np setPlayerView:mview];
//    return mview;
//}

- (void)viewDidLoad {
    [self rtspInit];
}
- (void)viewDidUnload{
    if(!self.vlcPlayer){
        return;
    }
    [self.vlcPlayer stop];
    self.vlcPlayer = nil;
}

//- (void)updateAttributes:(NSDictionary *)attributes{
//    if (attributes[@"playUrl"]) {
//        self.playUrl = attributes[@"playUrl"];
//    }
//}

WX_EXPORT_METHOD(@selector(startPlay:)) // 暴露该方法给js
- (void)startPlay:(NSString *)playUrl {
    self.playUrl = playUrl;
    [self rtspPlay];
}
WX_EXPORT_METHOD(@selector(channelPlay:)) // 暴露该方法给js
- (void)channelPlay:(NSString *)playUrl {
    [self rtspStop];
    self.playUrl = playUrl;
    [self rtspPlay];
}

- (void)rtspInit{
    if(self.vlcPlayer){
        return;
    }
    self.vlcPlayer = [[VLCMediaPlayer alloc] initWithOptions:nil];
    self.vlcPlayer.drawable = self.view;
//    VLCMedia *media = [VLCMedia mediaWithURL:[NSURL URLWithString: self.playUrl]];
//    [self.vlcPlayer setMedia:media];
    self.vlcPlayer.delegate = self;//代理触发链接回调
}
- (void)rtspPlay{
    if(!self.vlcPlayer){
        return;
    }
    VLCMedia *media = [VLCMedia mediaWithURL:[NSURL URLWithString: self.playUrl]];
    [self.vlcPlayer setMedia:media];
    [self.vlcPlayer play];
    [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":@"正在加载",@"state":@"1"}];
}
- (void)rtspStop{
    if(!self.vlcPlayer){
        return;
    }
    [self.vlcPlayer stop];
}




- (void)toast:(NSString *)msg{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showImage:nil status:msg];
    });
}
- (void)mediaPlayerStateChanged:(NSNotification *)aNotification{
    if(self.vlcPlayer.state == VLCMediaPlayerStateBuffering){
        [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":@"播放成功",@"state":@"2"}];
    }else if(self.vlcPlayer.state == VLCMediaPlayerStatePlaying || self.vlcPlayer.state == VLCMediaPlayerStateESAdded){
        [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":@"正在加载",@"state":@"1"}];
    }else{
        [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":@"失败",@"state":@"0"}];
    }
}


@end
