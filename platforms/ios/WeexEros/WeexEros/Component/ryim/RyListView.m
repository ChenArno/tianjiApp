//
//  RyListView.m
//  WeexEros
//
//  Created by chen century on 2018/3/9.
//  Copyright © 2018年 benmu. All rights reserved.
//

#import "RyListView.h"
#import "chatViewController.h"
#import "sqlite.h"

@interface RyListView()


@end

NSString *userUuid;
NSString *otherUuid;
BaseDB *myBaseDB;
@implementation RyListView
{
    NSMutableArray * demoData;
    UIRefreshControl * refreshControl;
}

// 暴露给 js 的方法
WX_EXPORT_METHOD(@selector(focus)) // 暴露该方法给js
WX_EXPORT_METHOD(@selector(selectData:success:))
WX_EXPORT_METHOD(@selector(openView:success:))
WX_EXPORT_METHOD(@selector(deleteItem:targetId:success:))
/**
 *  初始化方法 通过
 *  @param ref          component 标示
 *  @param type         component 类型 这里是 bmCalendar
 *  @param styles       js 定义的样式
 *  @param attributes   js 定义的属性
 *  @param events       js 绑定的事件
 *  @param weexInstance 关联的 weex 实例
 */

//初始化
- (instancetype)initWithRef:(NSString *)ref type:(NSString *)type styles:(NSDictionary *)styles attributes:(NSDictionary *)attributes events:(NSArray *)events weexInstance:(WXSDKInstance *)weexInstance
{
    _instance = weexInstance;
    if (self = [super initWithRef:ref type:type styles:styles attributes:attributes events:events weexInstance:weexInstance]) {
//        NSString *kFilename = [NSHomeDirectory() stringByAppendingFormat:@"/Library/Application Support/RongCloud"];
//        NSFileManager *manager = [NSFileManager defaultManager];
//        NSArray *allPath =[manager subpathsAtPath:kFilename];
//        for (NSString *subPath in allPath) {
//        }
        
        [RCIM sharedRCIM].receiveMessageDelegate = self; //接受消息监听
        //  设置头像为圆形
        [RCIM sharedRCIM].globalMessageAvatarStyle = RC_USER_AVATAR_CYCLE;
        if(attributes[@"userUuid"]){
            userUuid = [WXConvert NSString:attributes[@"userUuid"]];
        }
    }
    return self;
}
//- (UIView *)loadView
//{
//    return [[UIView alloc]init];
//}
- (void)updateAttributes:(NSDictionary *)attributes{
    if (attributes[@"userUuid"]) {
        userUuid = attributes[@"userUuid"];
    }
}

//开始
- (void)viewDidLoad {
//    [self setButton];
    
}

//
-(void)setButton{
    UIButton *button = [[UIButton alloc]initWithFrame:CGRectMake(0, 64, 200, 100)];
    [self.view addSubview:button];
    [button setTitle:@"原生的button" forState:UIControlStateNormal];
    [button setTitleColor:[UIColor redColor] forState:UIControlStateNormal];
    
    //添加手势
    UITapGestureRecognizer * tapGesture = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapAction:)];
    [button addGestureRecognizer:tapGesture];
}
// 实现暴露给 js 的方法
- (void)focus
{
    NSLog(@"you got it");
}
-(void)tapAction:(id)tap
{
NSLog(@"you got it");
}
- (void)selectData:(NSString *)userId success:(WXModuleCallback)success{
    NSArray *array = [[NSArray alloc]init];
    NSMutableArray *usersArray = [NSMutableArray array];
    array = [[RCIMClient sharedRCIMClient]getConversationList:@[@(ConversationType_PRIVATE)]];
    for (RCConversation *con in array) {
        NSMutableDictionary *obj=[[NSMutableDictionary alloc] init];
        NSString *content = @"";
        if([con.lastestMessage isMemberOfClass:[RCTextMessage class]]){
            RCTextMessage *textMessage = (RCTextMessage *)con.lastestMessage;
            content = textMessage.content;
        }
        RCUserInfo *user = [self selectById:con.targetId];
        if(usersArray == nil){
            break;
        }
        NSString *typeName = con.objectName;
        if(content.length == 0 && typeName.length == 0){
            break;
        }
        NSString *sentTime = [NSString stringWithFormat:@"%lld",con.sentTime];
        [obj setObject:con.targetId forKey:@"userId"];
        [obj setObject:user.name forKey:@"name"];
        [obj setObject:typeName forKey:@"typeName"];
        [obj setObject:content forKey:@"content"];
        [obj setObject:sentTime forKey:@"lastTime"];
        [obj setObject:[NSString stringWithFormat:@"%d",con.unreadMessageCount] forKey:@"unreadCount"];
        [obj setObject:con.targetId forKey:@"avatarUrl"];
        [usersArray addObject:obj];
    }
        if(success){
            success(usersArray);
        }
}
//- (void)selectData:(NSString *)userId success:(WXModuleCallback)success{
//    NSString *sql = @"select t1.target_id as target_id,t3.label as label,t3.avatarUrl as avatarUrl,t2.unread_count as unread_count,t1.clazz_name as clazz_name,t1.extra_column6 as content,t1.last_time as last_time from (select t1.target_id,t1.last_time,t2.clazz_name,t2.extra_column6 from RCT_CONVERSATION t1 inner join RCT_MESSAGE t2 on t1.target_id=t2.target_id and t1.last_time =t2.send_time)t1 left join (select target_id,sum (case when read_status=0 then 1 else 0 end) as unread_count from RCT_MESSAGE group by target_id) t2 on t1.target_id=t2.target_id left join USER_INFO t3 on t3.ryId = t1.target_id where t3.ryId IS not null";
//    BaseDB *mBaseDB = [[BaseDB alloc]init];
//    NSArray *data = [mBaseDB selectData:sql columns:7 userId:userId];
//    NSMutableArray *users = [NSMutableArray array];
//    for (NSArray *row in data) {
//        NSMutableDictionary *obj=[[NSMutableDictionary alloc] init];
//        [obj setObject:[row objectAtIndex:0] forKey:@"userId"];
//        [obj setObject:[row objectAtIndex:1] forKey:@"name"];
//        [obj setObject:[row objectAtIndex:2] forKey:@"avatarUrl"];
//        [obj setObject:[row objectAtIndex:3] forKey:@"unreadCount"];
//        [obj setObject:[row objectAtIndex:4] forKey:@"typeName"];
//        [obj setObject:[row objectAtIndex:5] forKey:@"content"];
//        [obj setObject:[row objectAtIndex:6] forKey:@"lastTime"];
//        [users addObject:obj];
//    }
//    if(success){
//        success(users);
//    }
//}
-(void)openView:(NSArray *)array success:(WXModuleCallback)success{
    //新建一个聊天会话View Controller对象,建议这样初始化
    RCConversationType conversationType =ConversationType_PRIVATE;
    otherUuid = [array objectAtIndex:0];
    //设置用户信息提供者,页面展现的用户头像及昵称都会从此代理取
    [[RCIM sharedRCIM] setUserInfoDataSource:self];
    dispatch_async(dispatch_get_main_queue(), ^{
        chatViewController *chat = [[chatViewController alloc] initWithConversationType:conversationType targetId:otherUuid];
        chat.conversationType = ConversationType_PRIVATE;
        chat.instance = _instance;
        //设置会话的目标会话ID。（单聊、客服、公众服务会话为对方的ID，讨论组、群聊、聊天室为会话的ID）
        //设置聊天会话界面要显示的标题
        chat.title = [array objectAtIndex:1];
        //显示聊天会话界面
        [[_instance.viewController navigationController] pushViewController:chat animated:YES];
    });
    if(success){
        success(@"进入成功");
    }
}
/**
 *此方法中要提供给融云用户的信息，建议缓存到本地，然后改方法每次从您的缓存返回
 */
- (void)getUserInfoWithUserId:(NSString *)userId completion:(void(^)(RCUserInfo* userInfo))completion
{
//    NSLog(@"--------%@:otherUuid:%@:userUuid%@",userId,otherUuid,userUuid);
    if ([userUuid isEqual:userId]) {
        RCUserInfo *user = [[RCUserInfo alloc]init];
        user = [self selectById:userUuid];
        return completion(user);
    }else if([otherUuid isEqual:userId]) {
        RCUserInfo *user = [[RCUserInfo alloc]init];
        user = [self selectById:otherUuid];
        return completion(user);
    }
}

- (RCUserInfo *) selectById:(NSString *)uuId{
    NSString *sql = [@"select label,avatarUrl from USER_INFO where ryId = '" stringByAppendingFormat:@"%@'",uuId];
    if(myBaseDB == nil){
        myBaseDB = [[BaseDB alloc]init];
    }
    NSArray *data = [myBaseDB selectData:sql columns:2 userId:userUuid];
    if([data count] == 0){
        return nil;
    }
    RCUserInfo *user = [[RCUserInfo alloc]init];
    user.userId = otherUuid;
    user.name = [[data firstObject] objectAtIndex:0];
    user.portraitUri = [[data firstObject] objectAtIndex:1];
    return user;
}


- (void)onRCIMReceiveMessage:(RCMessage *)message left:(int)left{
    if([UIApplication sharedApplication].applicationState == UIApplicationStateActive)//应用在前台
    {
        [_instance fireGlobalEvent:@"ryPushMessage" params:@{@"key":@"value"}];
    }
    else//应用在后台
    {
        int allunread = [[RCIMClient sharedRCIMClient] getTotalUnreadCount];//获取消息数量
        if(allunread > 0)
        {
            [[UIApplication sharedApplication] setApplicationIconBadgeNumber:allunread];//修改应用图标上的数字
        }
    }
}

- (void)deleteItem:(RCConversationType)conversationType targetId:(NSString *)targetId success:(WXModuleCallback)success{
    Boolean suc = [[RCIMClient sharedRCIMClient] clearMessages:conversationType targetId:targetId];
    if(suc == YES){
        success(@"true");
    }
}

@end
