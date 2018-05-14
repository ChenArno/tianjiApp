//
//  RCDNavigationViewController.m
//  RCloudMessage
//
//  Created by Jue on 16/7/25.
//  Copyright © 2016年 RongCloud. All rights reserved.
//

#import "chatViewController.h"
#import "UIColor+RCColor.h"

@interface chatViewController ()

@end

@implementation chatViewController

- (void)viewDidLoad {
  [super viewDidLoad];
   // self.conversationMessageCollectionView.backgroundColor = [UIColor yellowColor];
    UIFont *font = [UIFont systemFontOfSize:19.f];
    NSDictionary *textAttributes = @{
                                     NSFontAttributeName : font,
                                     NSForegroundColorAttributeName : [UIColor blackColor]
                                     };
    UINavigationBar *navigationBar = [UINavigationBar appearance];
    [navigationBar setTitleTextAttributes:textAttributes];
    [navigationBar setTintColor:[UIColor blackColor]];
    [navigationBar setBarTintColor:[UIColor colorWithHexString:@"#FFFFFF" alpha:1.0]];
    UIButton *leftBtn = [[UIButton alloc] initWithFrame:CGRectMake(2,2,32,32)];
//    [leftBtn setTitle:@"返回" forState:UIControlStateNormal];
//    [leftBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    
    UIImage *image = [UIImage imageNamed:@"leftBack"];
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(2,8,9,16)];
    [imageView setImage:image];
    [leftBtn addTarget:self action:@selector(btnClick) forControlEvents:UIControlEventTouchUpInside];
    [leftBtn addSubview:imageView];
    UIBarButtonItem *leftButton = [[UIBarButtonItem alloc] initWithCustomView:leftBtn];
    self.navigationItem.leftBarButtonItem = leftButton;
//    [RCIM sharedRCIM].userInfoDataSource = self;
    
//    
}

- (void) didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

- (void)didSendMessage:(NSInteger)stauts content:(RCMessageContent *)messageCotent
{
    
}

- (void)viewWillDisappear:(BOOL)animated{
    [super viewWillDisappear:YES];
    [_instance fireGlobalEvent:@"ryPushMessage" params:@{@"key":@"value"}];
}


- (void)presentLocationViewController:(RCLocationMessage *)locationMessageContent{
//    NSLog(@"sdddd%@",locationMessageContent);
//    RCLocationViewController *picker = [[RCLocationViewController alloc] init];
//    //    picker.delegate = self;
//    picker.dataSource = locationMessageContent;
//    //    指定默认数据源，如有需求可以自定义数据源RCLocationPickerViewControllerDataSource
//    [self.navigationController pushViewController:picker animated:YES];
}

//按钮的点击事件

- (void)btnClick{
    [self.navigationController popViewControllerAnimated:YES];
}
@end
