//
//  sqlite.h
//  WeexEros
//
//  Created by chen century on 2018/3/12.
//  Copyright © 2018年 benmu. All rights reserved.
//

#ifndef sqlite_h
#define sqlite_h


#endif /* sqlite_h */
#import <Foundation/Foundation.h>
#import <sqlite3.h>

@interface BaseDB : NSObject

//创建表
- (void)createTable:(NSString *)sql userId:(NSString *)userId;
/**
 * 接口描述：插入数据、删除数据、修改数据
 * 参数：  sql: SQL语句
 * 返回值：是否执行成功 *
 */
- (BOOL)dealData:(NSString *)sql paramsarray:(NSArray *)params userId:(NSString *)userId;

/**
 *  接口描述：查询数据
 *  参数：  sql:SQL语句
 *  返回值：[
 [“字段值1”，“字段值2”，“字段值3”],
 [“字段值1”，“字段值2”，“字段值3”],
 [“字段值1”，“字段值2”，“字段值3”],
 ]
 */
- (NSMutableArray *)selectData:(NSString *)sql columns:(int)number userId:(NSString *)userId;
@end
