//
//  Weex.m
//  WeexEros
//
//  Created by chen century on 2018/2/23.
//  Copyright © 2018年 benmu. All rights reserved.
//

#import "Weex.h"
#import "pgyupdate.h"
#import "RyIm.h"
#import "Tjchart.h"
#import <RongIMKit/RongIMKit.h>
#import "RyListView.h"
#import "PlayerView.h"
#import "EzplayView.h"

@implementation Weex
+(void)initWeex:(NSString *)group{
    [WXSDKEngine initSDKEnvironment];
    [[RCIM sharedRCIM] initWithAppKey:@"c9kqb3rdcyhqj"];
    
    [self registerModules];
    [self registerComponents];
}

+ (void)registerModules
{
    NSDictionary *modules = @{
                              @"pgyupdate": NSStringFromClass([pgyupdate class]),
                              @"rongyun": NSStringFromClass([RyIm class])
                              };
    
    for (NSString *moduleName in modules.allKeys) {
        [WXSDKEngine registerModule:moduleName withClass:NSClassFromString([modules valueForKey:moduleName])];
    }
}
+ (void)registerComponents
{
    NSDictionary *components = @{
                                @"rylist": NSStringFromClass([RyListView class]),
                                @"tjEcharts": NSStringFromClass([Tjchart class]),
                                @"tj-video": NSStringFromClass([PlayerView class]),
                                @"tj-ysy-video": NSStringFromClass([EzplayView class])
                                 };
    for (NSString *componentName in components) {
        [WXSDKEngine registerComponent:componentName withClass:NSClassFromString([components valueForKey:componentName])];
    }
}

@end
