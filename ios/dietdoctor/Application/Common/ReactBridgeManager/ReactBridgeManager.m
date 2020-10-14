//
//  ReactBridgeManager.m
//  dietdoctor
//
//  Created by Sumeet Agarwal on 14/10/20.
//

#import "ReactBridgeManager.h"
#import "dietdoctor-Swift.h"
#import "AppDelegate.h"

@class DietChartViewController;

@implementation ReactBridgeManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(navigateToNativeModule: (NSDictionary *)nutrition) {
  
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"DietDoctor" bundle:nil];
    DietChartViewController *vc = [sb instantiateViewControllerWithIdentifier:@"dietChart"];
    vc.nutrition = nutrition;
    vc.modalTransitionStyle = UIModalTransitionStyleFlipHorizontal;
    [appDelegate.rootNavigationController pushViewController:vc animated:true];
  });
}

RCT_EXPORT_METHOD(getSystemLanguage: (RCTResponseSenderBlock)callback) {

  NSString * language = [NSLocale preferredLanguages];
  NSLog(@"Languag is %@", language);
  callback(language);
}

@end
