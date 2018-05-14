//
//  RyIm.m
//  WeexEros
//
//  Created by chen century on 2018/3/9.
//  Copyright © 2018年 benmu. All rights reserved.
//

#import "RyIm.h"
#import "WXSDKEngine.h"
#import "WXDemoViewController.h"
#import <RongIMKit/RongIMKit.h>
#import "sqlite.h"

@interface RyIm()

@end
BaseDB *mBaseDB;
NSObject *userInfo;
@implementation RyIm

WX_EXPORT_METHOD(@selector(ryConnect:success:error:))
- (void)ryConnect:(NSString *)token success:(WXModuleCallback)success error:(WXModuleCallback)error
{
    [self logout];
    [[RCIM sharedRCIM] connectWithToken:token     success:^(NSString *userId) {
        NSLog(@"登陆成功。当前登录的用户ID：%@", userId);
//        WXSDKInstance *instance = [[WXSDKInstance alloc]init];        
//        [instance fireGlobalEvent:@"ryPushMessage" params:@{@"isFirst":@"true"}];
        success(userId);
    } error:^(RCConnectErrorCode status) {
        NSLog(@"登陆的错误码为:%d", status);
        if(error){
            error(@"登陆的错误码为:");
        }
    } tokenIncorrect:^{
        //token过期或者不正确。
        //如果设置了token有效期并且token过期，请重新请求您的服务器获取新的token
        //如果没有设置token有效期却提示token错误，请检查您客户端和服务器的appkey是否匹配，还有检查您获取token的流程。
        NSLog(@"token错误");
        if(error){
            error(@"token错误");
        }
    }];
    
}
WX_EXPORT_METHOD(@selector(logout))
- (void)logout{
    [[RCIM sharedRCIM] logout];
}


- (void)createTable:(NSString *)userId{
    NSString *sql = @"CREATE TABLE IF NOT EXISTS USER_INFO (id varchar(50),ryId,label varchar(50),shortLabel,pid varchar(50),nodeType int,avatarUrl varchar(255));";
    mBaseDB = [[BaseDB alloc]init];
    [mBaseDB createTable:sql userId:userId];
}

//
WX_EXPORT_METHOD(@selector(addUser:userId:success:error:))
- (void)addUser:(NSArray *)array userId:(NSString *)userId success:(WXModuleCallback)success error:(WXModuleCallback)error{
    NSString *sql = @"INSERT OR REPLACE INTO USER_INFO (id,ryId,label,shortLabel,pid,nodeType,avatarUrl) VALUES (?,?,?,?,?,?,?)";
//    NSArray *params = [NSArray arrayWithObjects:id,
//                       ryId,
//                       label,shortLabel,pid,nodeType, telephone,nil];
    mBaseDB = [[BaseDB alloc]init];
    bool suc = [mBaseDB dealData:sql paramsarray:array userId:userId];
    if(suc){
        success(@"true");
    }else{
        if(error){
            error(@"false");
        }
    }
}
WX_EXPORT_METHOD(@selector(clearDb:userId:success:error:))
- (void)clearDb:(NSArray *)array userId:(NSString *)userId success:(WXModuleCallback)success error:(WXModuleCallback)error{
    [self createTable:userId];
    NSString *sql = @"delete from USER_INFO where 1=1";
    //    NSArray *params = [NSArray arrayWithObjects:id,
    //                       ryId,
    //                       label,shortLabel,pid,nodeType, telephone,nil];
    bool suc = [mBaseDB dealData:sql paramsarray:array userId:userId];
    if(suc){
        success(@"true");
    }else{
        if(error){
            error(@"false");
        }
    }
}

WX_EXPORT_METHOD(@selector(selectAll:sql:success:))
- (void)selectAll:(NSString *)userId sql:(NSString *)sql success:(WXModuleCallback)success{
    NSMutableArray *user = [self selectUser:userId sql:sql];
    success(user);
}
- (NSMutableArray *) selectUser:(NSString *)userUuid sql:(NSString *)sql{
    if(mBaseDB == nil){
        mBaseDB = [[BaseDB alloc]init];
    }
    NSArray *data = [mBaseDB selectData:sql columns:7 userId:userUuid];
    if([data count] == 0){
        return [[NSMutableArray alloc]init];
    }
    NSMutableArray *userArray = [NSMutableArray array];
    for (NSArray *row in data) {
        NSMutableDictionary *obj=[[NSMutableDictionary alloc] init];
        [obj setObject:[row objectAtIndex:0] forKey:@"id"];
        [obj setObject:[row objectAtIndex:1] forKey:@"ryId"];
        [obj setObject:[row objectAtIndex:2] forKey:@"label"];
        [obj setObject:[row objectAtIndex:3] forKey:@"shortLabel"];
        [obj setObject:[row objectAtIndex:4] forKey:@"pid"];
        [obj setObject:[row objectAtIndex:5] forKey:@"nodeType"];
        [obj setObject:[row objectAtIndex:6] forKey:@"avatarUrl"];
        [userArray addObject:obj];
    }
    return userArray;
}

@end
