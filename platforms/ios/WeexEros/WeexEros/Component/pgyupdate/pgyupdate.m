//
//  pgyupdate.m
//  WeexEros
//
//  Created by chen century on 2018/2/23.
//  Copyright © 2018年 benmu. All rights reserved.
//


#import "pgyupdate.h"
#import "WXSDKEngine.h"
#import "WXDemoViewController.h"
#import "AYCheckManager.h"

@implementation pgyupdate

@synthesize weexInstance;
WX_EXPORT_METHOD(@selector(openURL:callback:))
//异步
- (void)openURL:(NSString *)url callback:(WXModuleCallback)callback
{
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        newURL = [NSURL URLWithString:url relativeToURL:weexInstance.scriptURL].absoluteString;
    }
    
    UIViewController *controller = [[WXDemoViewController alloc] init];
    ((WXDemoViewController *)controller).url = [NSURL URLWithString:newURL];
    
    [[weexInstance.viewController navigationController] pushViewController:controller animated:YES];
    callback(@{@"result":@" success"});
}

WX_EXPORT_METHOD_SYNC(@selector(update))
//同步
- (NSString *)update
{
    NSLog(@"sss");
    #if !(TARGET_IPHONE_SIMULATOR)//模拟器 TARGET_IPHONE_SIMULATOR
        AYCheckManager *checkManger = [AYCheckManager sharedCheckManager];
        checkManger.countryAbbreviation = @"cn";
        [checkManger checkVersion];
        [checkManger checkVersionWithAlertTitle:@"发现新版本" nextTimeTitle:@"下次提示" confimTitle:@"前往更新" skipVersionTitle:@"跳过当前版本"];
    #endif
    return @"testString";
}

//响应升级提示按钮
- (void)alertView:(UIAlertView *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex {
    //如果选择“现在升级”
    if (buttonIndex == 1)
    {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"https://itunes.apple.com/cn/app/%E5%8F%AE%E5%92%9A-%E8%BF%90%E8%90%A5/id1256312934?mt=8"]];
    }
}

@end


