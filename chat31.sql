/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 100132
Source Host           : localhost:3306
Source Database       : chat

Target Server Type    : MYSQL
Target Server Version : 100132
File Encoding         : 65001

Date: 2019-03-01 23:30:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `menber` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES ('1', '222000', '在线交流群', '学习java交流群', '1,2,3,4,5');
INSERT INTO `group` VALUES ('2', '661320', '测试群1', '用来测试的', '1,2,3,');
