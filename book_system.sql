/*
 Navicat Premium Data Transfer

 Source Server         : 本机mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : book_system

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 11/07/2020 14:18:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, 'c37csq', 'c37csq5211314');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (4, 'http://img61.ddimg.cn/upload_img/00785/ts0310_0314/750x315-1583737518.jpg');
INSERT INTO `banner` VALUES (5, 'http://img61.ddimg.cn/upload_img/00838/cxtc/750x315-1583737502.jpg');
INSERT INTO `banner` VALUES (6, 'http://img63.ddimg.cn/topic_img/gys_0015409/aiqing750315.jpg');
INSERT INTO `banner` VALUES (7, 'http://img60.ddimg.cn/upload_img/00316/by/750x315-1584356197.jpg');
INSERT INTO `banner` VALUES (8, 'http://img62.ddimg.cn/2020/4/30/202004301340354809.jpg');
INSERT INTO `banner` VALUES (9, 'http://img60.ddimg.cn/upload_img/00838/cxtc/750x315-1588224240.jpg');

-- ----------------------------
-- Table structure for book_info
-- ----------------------------
DROP TABLE IF EXISTS `book_info`;
CREATE TABLE `book_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookDesc` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `addTime` bigint(20) NOT NULL,
  `view_count` int(255) UNSIGNED NOT NULL DEFAULT 0,
  `type` int(255) NOT NULL,
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `creatorImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `creatorId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `likers` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `likeCounts` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book_info
-- ----------------------------
INSERT INTO `book_info` VALUES (1, 'JavaScript高级程序设计三', '扎卡斯', 'http://127.0.0.1:7004/public/uploads/158497341645401.png', '<p><span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 13px;font-family: Hiragino Sans GB;\">全书从JavaScript语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax与Comet服务器端通信，HTML5表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的最佳开发实践。《JavaScript高级程序设计(第3版)》附录展望了未来的API和ECMAScript Harmony规范。</span> <span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 13px;font-family: Hiragino Sans GB;\">适合写JavaScript 半年到一年左右的人来看，如果你刚接触JavaScript ，不推荐看，因为这里的概念对于你来说比较枯燥，读起来没有感觉，不如先去多写点功能，增加对JavaScript 的兴趣。然后过几个月再看更有感触。</span>&nbsp;</p>\n', 1577894400, 193, 6, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '84', '1903498134@qq.com', '54224597', '54224597,62586659,936333376373711236', 4);
INSERT INTO `book_info` VALUES (2, '人间词话', '王国维', 'http://127.0.0.1:7004/public/uploads/158497602531002.png', '<p><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Microsoft Yahei\", 微软雅黑, arial, 宋体, sans-serif;\">这是百年来中国极具影响力的美学经典。作者运用传统的词话形式及思维逻辑，较为自然的融入进了新的观念，开创性的梳理出词的规律，用64则笔记讲透词的美学核心。</span>&nbsp;</p>\n', 1584976043, 19, 2, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '30', '1903498134@qq.com', '54224597', '', 0);
INSERT INTO `book_info` VALUES (3, '儒林外史', '吴敬梓', 'http://127.0.0.1:7004/public/uploads/1584976690916图片2.png', '<p><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\">这本书全书共五十六回，以写实主义描绘各种人士对功名利禄的不同表现，是一部描述中国古代官场的百科全书式小说，一方面真实揭示了人性被污染的过程，一方面热情歌颂了少数人坚持自我，是中国古典讽刺小说的典范</span> 。</p>\n<p style=\"text-align:justify;\"></p>\n<p><br>&nbsp;</p>\n', 1584976749, 6, 1, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '55', '1903498134@qq.com', '54224597', '54224597', 1);
INSERT INTO `book_info` VALUES (4, '背影', '朱自清', 'http://127.0.0.1:7004/public/uploads/1584976990328图片3.png', '<p><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Microsoft Yahei\", 微软雅黑, arial, 宋体, sans-serif;\">朱自清的散文被誉为“白话美文的典范”。这本《背影》朱自清散文集不仅收录了《背影》、《荷塘月色》、《匆匆》等脍炙人口的名篇，还有一些他外出访学时的优美游记《威尼斯》、《罗马》、《巴黎》等名篇。</span>&nbsp;</p>\n', 1584977003, 9, 2, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '66', '1903498134@qq.com', '54224597', '54224597', 1);
INSERT INTO `book_info` VALUES (5, '自在独行', '贾平凹', 'http://127.0.0.1:7004/public/uploads/1584977442784图片4.png', '<p><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Microsoft Yahei\", 微软雅黑, arial, 宋体, sans-serif;\">贾平凹先生喜静，让他觉得自在的，要么是行走于西北大地，要么是隐居在自己的书房。这本书写情感、聊爱好、谈社会、说人生。有智慧，也有生活乐趣。</span>&nbsp;</p>\n', 1584977453, 19, 2, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '78', '1903498134@qq.com', '54224597', '54224597', 1);
INSERT INTO `book_info` VALUES (6, '活着', '余华', 'http://127.0.0.1:7004/public/uploads/1584977853162图片5.png', '<p><span style=\"color: rgb(51,51,51);background-color: rgb(255,255,255);font-size: 16px;font-family: Microsoft Yahei\", 微软雅黑, arial, 宋体, sans-serif;\">这本书讲述了随着国共内战、三反五反、大跃进、文化大革命等中国社会的变革，徐福贵的人生和家庭不断地经受着苦难，最后身边的亲人都先后离他而去，只剩下一头老牛陪伴着他。</span>&nbsp;</p>\n', 1584977862, 228, 2, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '80', '1903498134@qq.com', '54224597', '54224597,62586659,936333376373711236', 3);
INSERT INTO `book_info` VALUES (8, '行走的人生', '俞敏洪', 'http://127.0.0.1:7004/public/uploads/1584978759041图片6.png', '<p style=\"text-align:start;\"><span style=\"color: rgba(0,0,0,0.65);background-color: rgb(255,255,255);font-size: 12px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji;\"><strong>这本书是俞老师17年8月份出的新书。（当时大致了解下内容，并没有认真细读品味，前阵子再次去读领会，感悟颇深）这本书籍属于俞老师作品的“新版图”。阅读这本书，与其一起“行走”，你会发现点滴生活与澎湃梦想同样重要。这也是一本充满情怀与智慧的人文图书，而且是“老俞闲话”的第一本文集。（而《在人生的最高处相见》是其第二本文集）。</strong> </span><span style=\"font-size: 12px;\"> </span><span style=\"color: rgb(64,64,64);background-color: rgb(255,255,255);font-size: 12px;font-family: -apple-system, BlinkMacSystemFont, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\"><strong>书中运用质朴、幽默的语言，有趣的故事、以及犀利的观点等，讲述了一位“斜杠大叔”的行走人生。</strong></span><span style=\"font-size: 12px;\"><strong> </strong></span><span style=\"color: rgb(64,64,64);background-color: rgb(255,255,255);font-size: 12px;font-family: -apple-system, BlinkMacSystemFont, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\"><strong>今后，俞老师也将继续写作，潜移默化地影响着众多读者们，一直激励着行走在人生路上的年轻人。未来，希望我们也不断尝试新事物、迎接新挑战，用行走和阅读来拓展我们新的生命体验</strong></span><span style=\"color: rgb(64,64,64);background-color: rgb(255,255,255);font-size: 16px;font-family: -apple-system, BlinkMacSystemFont, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\"><strong>。</strong></span><strong> </strong></p>\n', 1584978766, 9, 2, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '57', '1903498134@qq.com', '54224597', '', 0);
INSERT INTO `book_info` VALUES (9, '环球科学', '科学美国人', 'http://127.0.0.1:7004/public/uploads/1585014512318202031153517.jpg', '<span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: medium;font-family: microsoft yahei;\">《环球科学》是《科学美国人》（Scientific&nbsp;American）独家授权中文版。《科学美国人》是在全球享有盛誉、历史最悠久的科学杂志，创刊170年来，始终坚持报道前沿科学，邀请一线科学家亲笔撰文，介绍本领域的最新研究和进展。迄今，已有150&nbsp;多位诺奖得主为《科学美国人》撰写过200&nbsp;多篇文章。《科学美国人》内容涵盖生物、物理、IT、医学、电子、经济、天文、地理、人类、自然等各科学领域。同时，《环球科学》也是权威科学期刊《自然》（nature）的版权合作方，每月精选《自然》文章，第一时间报道重要科技进展和事件。170&nbsp;年如一的品质，让《科学美国人》在全球具有极高的公信力，始终致力于为公众提供有关科技、商业及政策的深度解读。《科学美国人》在美国、中国、德国、意大利、法国、西班牙、日本、巴西、俄罗斯、日本等15&nbsp;个国家和地区同步出版国际版本，全球范围内读者数量超过500&nbsp;万</span> 。</p>\n</span><p><br></p></span><p><br></p>', 1585014529, 12, 12, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '30', '1903498134@qq.com', '54224597', '54224597', 1);
INSERT INTO `book_info` VALUES (10, '斗罗大陆', '唐家三少', 'http://127.0.0.1:7004/public/uploads/158501523725528516097-1_h_6.jpg', '<p style=\"text-align:start;\"><span style=\"color: rgb(101,101,101);background-color: rgb(255,255,255);font-size: 14px;font-family: Hiragino Sans GB\", Verdana, Simsun;\"><strong>《斗罗大陆》系列作品是唐家三少人气非常高、非常受欢迎的作品，是唐家三少出道以来有很大影响力和代表性的小说。★《斗罗大陆 第二部 绝世唐门》和《斗罗大陆 第三部 龙王传说》图书上市以来，多次登上开卷畅销榜！《斗罗大陆 第三部 龙王传说》至今仍常登各平台青春文学类图书榜单！</strong></span>&nbsp;</p>\n', 1585015386, 164, 1, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '25', '1903498134@qq.com', '54224597', '54224597,19696264', 2);
INSERT INTO `book_info` VALUES (11, '鬼谷子', '吉林文史', 'http://127.0.0.1:7004/public/uploads/15850159741001395620125-1_h_12.jpg', '<p><span style=\"color: rgb(101,101,101);background-color: rgb(255,255,255);font-size: 14px;font-family: Hiragino Sans GB\", Verdana, Simsun;\">《鬼谷子》是一部集纵横家、兵家、道家、仙家、阴阳家等思想于一体的理论著作。本书对原作做了精当而晓畅的注释与翻译，每篇皆附有提要以解析、导读，并精选了古今中外颇具代表性的案例，涵盖管理、商场、职场、处世等各个领域，逐篇阐释、解读，用精彩纷呈的故事呈现鬼谷子的智慧谋略。</span>&nbsp;</p>\n', 1585016015, 7, 3, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '36.8', '1903498134@qq.com', '54224597', '', 0);
INSERT INTO `book_info` VALUES (12, '雪中悍刀行', '烽火戏诸侯', 'http://127.0.0.1:7004/public/uploads/15850163510061960159775_ii_cover.jpg', '<p><span style=\"color: rgb(64,64,64);background-color: rgb(255,255,255);font-size: 12px;font-family: Microsoft Yahei;\">道门真人飞天入地，千里取人首级；佛家菩萨低眉怒目，抬手可撼昆仑；谁又言书生无意气，一怒敢叫天子露戚容。踏江踏湖踏歌，我有一剑仙人跪；提刀提剑提酒，三十万铁骑征天。 老仆剑九背匣，吕祖修道骑牛，天道悠悠难觅，情之一字可杀人。</span></p>\n', 1585016364, 380, 1, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '59', '1903498134@qq.com', '936333376373711236', '62586659,54224597,936333376373711236', 3);
INSERT INTO `book_info` VALUES (13, '人间失格', '太宰治', 'http://127.0.0.1:7004/public/uploads/158501781400123761145-1_l_6.jpg', '<p style=\"text-align:start;\"><span style=\"color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 16px;font-family: Verdana, \"Microsoft Yahei;\">超燃！“丧文化”流行，《人间失格》成了现象级畅销书，创当当3天销售50000+册的奇迹！收录作者绝笔之作《Good bye》。一个“丧失为人资格”少年的心灵独白，一个对村上春树影响至深的绝望凄美故事。</span>&nbsp;</p>\n', 1585017863, 22, 4, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '25', '1903498134@qq.com', '54224597', '54224597', 1);
INSERT INTO `book_info` VALUES (14, '法医秦明', '秦明', 'http://127.0.0.1:7004/public/uploads/158502849405228507618-1_x_1.jpg', '<p style=\"text-align:start;\"><span style=\"color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 16px;font-family: Verdana, \"Microsoft Yahei;\">畅销原创悬疑品牌“法医秦明”系列经典作品！年轻女子连环离奇失踪，是谁在黑暗中窥探迷失的灵魂？播放量破16亿的“法医秦明”网剧原著小说！</span>&nbsp;</p>\n', 1585028577, 133, 1, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '91', '1903498134@qq.com', '54224597', '54224597,62586659', 2);
INSERT INTO `book_info` VALUES (15, '14号门', '彼得·克莱斯', 'http://127.0.0.1:7004/public/uploads/15850305669511900568524_ii_cover.jpg', '<p><span style=\"color: rgb(64,64,64);background-color: rgb(255,255,255);font-size: 14px;font-family: Hiragino Sans GB;\">人们遇到永远改变一生的东西，凭借的往往是纯粹的运气，内特·塔克能找到这套公寓也是一样。 内特刚搬进的新公寓有点不太寻常…… 异常便宜的房租，新奇古怪的租客们，14号门的重重挂锁，诡异的黑光灯，匪夷所思的公寓格局，七脚绿色蟑螂，查无根据的建筑信息，尘封百年的地下通道…… 在内特的号召下，租客们聚到一起，开始了一场疯狂的冒险之旅，他们发誓要挖掘这栋公寓的秘密。</span>&nbsp;</p>\n', 1585030640, 31, 1, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', '57', '2418064609@qq.com', '62586659', '54224597', 1);
INSERT INTO `book_info` VALUES (16, '断舍离', '山下英子', 'http://127.0.0.1:7004/public/uploads/158504503296723271503-1_l_10.jpg', '<p style=\"text-align:start;\"><span style=\"color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 16px;font-family: Verdana, \"Microsoft Yahei;\">经典断舍离！山下英子初版全本，未经任何删节！2013年7月引进内地，简体中文版系列累计印量已突破200万册！改变千万人生活方式的进阶革命！</span>&nbsp;</p>\n', 1585045039, 10, 2, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', '32', '2418064609@qq.com', '62586659', '', 0);
INSERT INTO `book_info` VALUES (17, '小李飞刀', '读客图书', 'http://127.0.0.1:7004/public/uploads/15851295497261960132312_ii_cover.jpg', '<p><span style=\"color: rgb(64,64,64);background-color: rgb(255,255,255);font-size: 16px;font-family: Microsoft Yahei\", simsun;\">内含第一部《多情剑客无情剑》 第二部《边城浪子》 第三部《九月鹰飞》 第四部《天涯·明月·刀》 第五部《飞刀，又见飞刀》</span><span style=\"font-size: 16px;\"> </span></p>\n', 1585129595, 8, 1, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', '20', '2418064609@qq.com', '62586659', '', 0);
INSERT INTO `book_info` VALUES (18, '人生', '路遥', 'http://127.0.0.1:7004/public/uploads/158539432285128504153-1_w_3.jpg', '<p style=\"text-align:start;\"><span style=\"color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 16px;font-family: Verdana, \"Microsoft Yahei;\">茅盾文学奖得主路遥代表作，激励万千读者的文学经典。写出每个年轻人的困境、期待与追求。改变马云人生，陈忠实、贾樟柯推荐。</span>&nbsp;</p>\n', 1585394349, 12, 2, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', '25.8', '2418064609@qq.com', '62586659', '', 0);
INSERT INTO `book_info` VALUES (19, '一年顶十年', '剽悍一只猫', 'http://127.0.0.1:7004/public/uploads/158564904131728523273-1_l_2.jpg', '<p style=\"text-align:start;\"><span style=\"color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 16px;font-family: Verdana, \"Microsoft Yahei;\">个人财富与影响力升级指南！樊登、冯仑、任泉、管清友倾力推荐，图书未上市，预订量已突破100000册。战略对了，你的一年顶别人十年！</span> </p>\n', 1585649066, 15, 7, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', '33', '2418064609@qq.com', '62586659', '54224597', 1);
INSERT INTO `book_info` VALUES (20, '金字塔原理', '巴巴拉·明托', 'http://127.0.0.1:7004/public/uploads/1585975087676图片1.png', '<p>这本书非常经典实用，即思考、表达和解决问题的逻辑。</p>\n<p>金字塔， 顾名思义，顶端是由一个中心思想开始，沿着各个分支依次展开延伸，状如金字塔。</p>\n<p>实则是一种重点突出、逻辑清晰、主次分明的逻辑思路、表达方式和规范动作。<br>简单来讲，这本书主要讲的是写作和沟通的思维表达逻辑。同时也培养我们一种意识，如何分析问题、搭建文章的整体框架。<br>该书向我们阐释了什么是金字塔原理，如何运用它（包括在实际中的应用）。让我们告别演绎式思维定式，采用自上而下的思维方式进行高效表达。当然，这个工具也很简单高效，值得我们反复学习，刻意训练。<br>&nbsp;</p>\n', 1585975151, 1, 7, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', '58', '1903498134@qq.com', '54224597', '', 0);
INSERT INTO `book_info` VALUES (23, '绿色国王', '保尔-卢·苏里策尔', 'http://127.0.0.1:7004/public/uploads/15887477372091.png', '<span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><span data-v-b53ecf8e=\"\"><p><span style=\"color: rgb(47,47,47);background-color: rgb(255,255,255);font-size: 16px;font-family: 微软雅黑, 宋体, 黑体, Arial, Helvetica, sans-serif;\">这本小说既描写了主人公那些曲折而惊险的传奇经历，又介绍了在激烈的竞争环境下，如何勇于开拓进取，精于企业经营的生动故事。使人们通过这一串生意经，能够一窥西方社会的种种……书名中的“绿色”有两层含义：一是钞票，二是和平，也就是他创建的那片国土的色彩，而这个国王的称号在某种意义上超越了世俗的权力与名誉。这本书记录了有史以来个人所能达到的最高梦想，同时也是一部对人权和法统的反思录，值得一生反复阅读的一本好书。</span></p>\n</span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p></span><p><br></p>', 1587800711, 1, 5, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', '57.5', '1903498134@qq.com', '54224597', '54224597', 1);
INSERT INTO `book_info` VALUES (24, '聪明的投资者', '本杰明·格雷厄姆', 'http://127.0.0.1:7004/public/uploads/1587800746824图片2.png', '<p><span style=\"color: rgb(34,34,34);background-color: rgb(255,255,255);font-size: 12px;font-family: Consolas, \"Lucida Console\", \"Courier New\", monospace;\">《聪明的投资者》主要面向个人投资者，对普通人投资策略的选择和执行方面提供了相应的指导。本书不是一本教人“如何成为百万富翁”的书籍，而更多地将注意力集中在投资的原理和投资者的态度方面，指导投资者避免陷入一些经常性的错误之中。除此之外，本书中还有贾森·兹威格根据近40年尤其是世纪之交全球股市的大动荡现实，进一步检验和佐证了价值投资理论。其中大量的注释和每章之后的点评非常有价值。股神巴菲特特为本书撰写的序言和评论也是本书的一大亮点。</span>&nbsp;</p>\n', 1587800764, 2, 5, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', '50', '1903498134@qq.com', '54224597', '54224597', 1);

-- ----------------------------
-- Table structure for comment_children
-- ----------------------------
DROP TABLE IF EXISTS `comment_children`;
CREATE TABLE `comment_children`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `likeCounts` int(11) NOT NULL DEFAULT 0,
  `dislikeCounts` int(11) NOT NULL DEFAULT 0,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `addTime` int(15) NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookId` int(11) NOT NULL,
  `relyTo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `likerIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `dislikerIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 128 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment_children
-- ----------------------------
INSERT INTO `comment_children` VALUES (120, 0, 1, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585630686, '66666666666', 12, 'CsqCds', '', '62586659');
INSERT INTO `comment_children` VALUES (121, 2, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585630692, '6666666666', 12, 'CsqCds', '62586659,54224597', '');
INSERT INTO `comment_children` VALUES (122, 1, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585720610, '可以！', 12, 'CsqCds', '62586659', '');
INSERT INTO `comment_children` VALUES (123, 0, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585720614, '66666666', 12, 'CsqCds', '', '');
INSERT INTO `comment_children` VALUES (127, 0, 0, 'c***q', 'http://tb.himg.baidu.com/sys/portraitn/item/d9e36333376373711236', 1588488434, '66666666', 10, 'c37csq', '', '');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `likeCounts` int(11) NOT NULL DEFAULT 0,
  `dislikeCounts` int(11) NOT NULL DEFAULT 0,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `addTime` int(15) NOT NULL,
  `isRely` tinyint(1) NOT NULL DEFAULT 0,
  `childrenId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookId` int(11) NOT NULL,
  `likerIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `dislikerIds` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 78 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (63, 2, 1, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585628576, 1, '121', '这本书真的挺好看的！', 12, '54224597,936333376373711236', '62586659');
INSERT INTO `comments` VALUES (64, 2, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585629544, 1, '120', '我赞同上面的那位！', 12, '62586659,54224597', '');
INSERT INTO `comments` VALUES (65, 0, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585705871, 0, '', '这本书还行吧！', 2, '', '');
INSERT INTO `comments` VALUES (66, 0, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585705880, 0, '', '666666', 16, '', '');
INSERT INTO `comments` VALUES (68, 1, 0, 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', 1585720604, 1, '122,123', '6666666', 12, '54224597', '');
INSERT INTO `comments` VALUES (69, 0, 0, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', 1585721298, 0, '', '666666666', 13, '', '');
INSERT INTO `comments` VALUES (70, 0, 0, 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', 1585806342, 0, '', '还行吧！', 14, '', '');
INSERT INTO `comments` VALUES (71, 0, 0, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', 1585984643, 0, '', '66666', 6, '', '');
INSERT INTO `comments` VALUES (72, 0, 0, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', 1585989059, 0, '', '666666', 17, '', '');
INSERT INTO `comments` VALUES (73, 1, 0, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', 1585989665, 0, '', '66', 15, '936333376373711236', '');
INSERT INTO `comments` VALUES (74, 2, 0, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', 1585990854, 1, '127', '666666', 10, '54224597,19696264', '');
INSERT INTO `comments` VALUES (75, 0, 0, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', 1586252801, 0, '', '6666666', 3, '', '');
INSERT INTO `comments` VALUES (76, 0, 0, 'c37csq', 'https://avatars1.githubusercontent.com/u/54224597?s=60&u=4bbc0ad1ceb05a60d3fcdf303ada70b17d09e890&v=4', 1587972588, 0, '', '66666', 24, '', '');
INSERT INTO `comments` VALUES (77, 1, 0, 'c***q', 'http://tb.himg.baidu.com/sys/portraitn/item/d9e36333376373711236', 1588412304, 0, '', '可以', 1, '19696264', '');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, '小说');
INSERT INTO `type` VALUES (2, '文学');
INSERT INTO `type` VALUES (3, '军事');
INSERT INTO `type` VALUES (4, '艺术');
INSERT INTO `type` VALUES (5, '金融');
INSERT INTO `type` VALUES (6, 'IT');
INSERT INTO `type` VALUES (7, '其他');
INSERT INTO `type` VALUES (12, '科学');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `likeIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `likeCounts` int(11) NULL DEFAULT 0,
  `fanIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `fans` int(11) NULL DEFAULT 0,
  `goodIds` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `goodCounts` int(11) NULL DEFAULT 0,
  `introduce` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('42777878787878783935311', 'w***0', 'http://tb.himg.baidu.com/sys/portraitn/item/b4c2777878787878783930g531b01000000', '', '', 0, '', 0, '', 0, NULL);
INSERT INTO `user` VALUES ('54224597', 'c37csq', 'https://avatars0.githubusercontent.com/u/54224597?v=4', '1903498134@qq.com', '', 0, '', 0, '', 0, NULL);
INSERT INTO `user` VALUES ('62586659', 'CsqCds', 'https://avatars2.githubusercontent.com/u/62586659?v=4', '2418064609@qq.com', '54224597', 1, '54224597,3', 2, '54224597,3', 2, '我是一个射手男，今年21岁，很高兴认识大家！我非常喜欢看书，同时也会多多推荐优质书籍！希望大家喜欢！同时也希望大家多多照顾！大家多多读书好好学习！让读书丰富我们的世界！');
INSERT INTO `user` VALUES ('936333376373711236', 'c***q', 'http://tb.himg.baidu.com/sys/portraitn/item/d9e36333376373711236', '', '', 0, '', 0, '', 0, NULL);

SET FOREIGN_KEY_CHECKS = 1;
