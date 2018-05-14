//
//  EzplayView.m
//  WeexEros
//
//  Created by chen century on 2018/3/31.
//  Copyright © 2018年 benmu. All rights reserved.
//

#import "EzplayView.h"
#import "EZUIKit.h"
#import "EZUIPlayer.h"
#import "EZUIError.h"
#import <SVProgressHUD.h>
@interface EzplayView() <EZUIPlayerDelegate>
@property (nonatomic,copy) NSString *playUrl;
@property (nonatomic,copy) NSString *appKey;
@property (nonatomic,copy) NSString *accessToken;
@property (nonatomic,strong) EZUIPlayer *mPlayer;

@end

@implementation EzplayView

- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    _instance = weexInstance;
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
//        if(attributes[@"playUrl"]){
//            self.playUrl = [WXConvert NSString:attributes[@"playUrl"]];
//        }
        if(attributes[@"option"]){
            NSString *option = [WXConvert NSString:attributes[@"option"]];
            if(option){
              [self getToken:option];
            }
        }
    }
    
    return self;
}

- (void)viewDidLoad {
    NSLog(@"ezplayviewDidLoad");
}

- (void)viewDidUnload{
    if (!self.mPlayer)
    {
        return;
    }
    
    [self.mPlayer.previewView removeFromSuperview];
    [self.mPlayer releasePlayer];
    self.mPlayer = nil;
}
- (void)updateAttributes:(NSDictionary *)attributes{
//    if (attributes[@"playUrl"]) {
//        self.playUrl = attributes[@"playUrl"];
//    }
    if(attributes[@"option"]){
        NSString *option = [WXConvert NSString:attributes[@"option"]];
        [self getToken:option];
    }
}

WX_EXPORT_METHOD(@selector(startPlay:)) // 暴露该方法给js
- (void)startPlay:(NSString *)playUrl {
    self.playUrl = playUrl;
    [self ysyStart];
}
WX_EXPORT_METHOD(@selector(channelPlay:)) // 暴露该方法给js
- (void)channelPlay:(NSString *)playUrl {
    [self ysystop];
    [self.mPlayer setEZOpenUrl:playUrl];
    [self ysyStart];
}


- (void)getToken:(NSString *)option{
    id obj = [NSJSONSerialization JSONObjectWithData:[option dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];
    self.appKey = [obj objectForKey:@"appKey"];
    self.accessToken = [obj objectForKey:@"accessToken"];
    [self ysyInit];
}

- (void)ysyInit{
    //    [EZUIKit initGlobalWithAppKey:self.appKey apiUrl:self.apiUrl];  //海外
    if (!self.appKey || self.appKey.length == 0 ||
        !self.accessToken || self.accessToken.length == 0)
    {
        [self toast:@"appkey或者accessToken不存在"];
        return;
    }
    [EZUIKit initWithAppKey:self.appKey];
    [EZUIKit setAccessToken:self.accessToken];
}

#pragma mark - player delegate

- (void) EZUIPlayerFinished
{
    [self ysystop];
}

- (void) EZUIPlayerPrepared
{
    [self ysyStart];
    [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":@"success",@"state":@"1s"}];
}

- (void) EZUIPlayerPlaySucceed:(EZUIPlayer *)player
{
    [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":@"success",@"state":@"2"}];
}

- (void) EZUIPlayer:(EZUIPlayer *)player didPlayFailed:(EZUIError *) error
{
    [self ysystop];
    NSString *playState = @"";
    NSString *playMsg = @"";
    //    self.playBtn.selected = NO;
    if ([error.errorString isEqualToString:UE_ERROR_INNER_VERIFYCODE_ERROR])
    {
        playState = @"verify_code_wrong";
        playMsg = @"验证码错误";
    }
    else if ([error.errorString isEqualToString:UE_ERROR_TRANSF_DEVICE_OFFLINE])
    {
        playState = @"device_offline";
        playMsg = @"设备不在线";
    }
    else if ([error.errorString isEqualToString:UE_ERROR_CAMERA_NOT_EXIST] ||
             [error.errorString isEqualToString:UE_ERROR_DEVICE_NOT_EXIST])
    {
        playState = @"camera_not_exist";
        playMsg = @"通道不存在";
    }
    else if ([error.errorString isEqualToString:UE_ERROR_INNER_STREAM_TIMEOUT])
    {
        playState = @"connect_out_time";
        playMsg = @"连接超时";
    }
    else if ([error.errorString isEqualToString:UE_ERROR_CAS_MSG_PU_NO_RESOURCE])
    {
        playState = @"connect_device_limit";
        playMsg = @"设备连接数过大";
    }
    else
    {
        playState = @"play_fail";
        playMsg = @"播放失败";
    }
    
    NSString *msg = [NSString stringWithFormat:@"%@(%@)",NSLocalizedString(playState, playMsg),error.errorString];
    [_instance fireGlobalEvent:@"PlayerView" params:@{@"key":msg,@"state":@"0"}];
    [self toast:msg];
}

- (void)toast:(NSString *)msg{
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [SVProgressHUD showImage:nil status:msg];
    });
}

#pragma mark - player

- (void)ysyStart{
    if (self.mPlayer)
    {
        [self.mPlayer startPlay];
        return;
    }
    
    self.mPlayer = [EZUIPlayer createPlayerWithUrl:self.playUrl];
    self.mPlayer.mDelegate = self;
    self.mPlayer.customIndicatorView = nil;//去除加载动画
    self.mPlayer.previewView.frame = CGRectMake(0, 0,
                                                CGRectGetWidth(self.mPlayer.previewView.frame),
                                                CGRectGetHeight(self.mPlayer.previewView.frame));
    [self.view addSubview:self.mPlayer.previewView];
    //该处去除，调整到prepared回调中执行，如为预览模式也可直接调用startPlay
    //    [self.mPlayer startPlay];
}
- (void) ysystop
{
    if (!self.mPlayer)
    {
        return;
    }
    [self.mPlayer stopPlay];
}

@end

