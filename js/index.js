$(function () {
    // 搜索按钮点击事件
    $('#search-button').click(function () {
        performSearch();
    });

    // 输入框回车键搜索（可选）
    $('#text').keypress(function (e) {
        // event object
        if (e.which === 13) { // 回车键
            e.preventDefault();
            performSearch();
        }
    });

    // 执行搜索函数
    function performSearch() {
        //返回一个“干净”的新字符串/不再区分 A 与 a
        const searchKeyword = $('#text').val().trim().toLowerCase();

        // 获取所有商品项
        const $allProducts = $('.product-item');

        if (searchKeyword === '') {
            // 如果搜索框为空，显示所有商品
            $allProducts.show();
            return;
        }

        // 遍历商品进行筛选
        $allProducts.each(function () {
            const $product = $(this);
            const productName = $product.find('.product-name').text().toLowerCase();

            // 检查商品名称是否包含搜索关键词
            if (productName.includes(searchKeyword)) {
                $product.show();
            } else {
                $product.hide();
            }
        });
    }

    // 清空搜索框时恢复所有商品显示
    $('#text').on('input', function () {
        if ($(this).val().trim() === '') {
            $('.product-item').show();
        }
    });

    /*第二部分左侧导航栏*/
    const fullCategories = [
        {
            title: '家用电器',
            items: ['曲面电视', '超薄电视', 'HDR电视', 'OLED电视', '4K超清电视', '55英寸', '65英寸', '电视配件',
                '壁挂式空调', '柜式空调', '中央空调', '一级能效空调', '变频空调', '1.5匹空调', '单冷空调', '以旧换新',
                '滚筒洗衣机', '洗烘一体机', '波轮洗衣机', '迷你洗衣机', '烘干机', '洗衣机配件']
        },
        {
            title: '手机/运营商/数码',
            items: ['手机', '游戏手机', '老人机', '对讲机', '以旧换新', '手机维修',
                '合约机', '选号码', '固话宽带', '办套餐', '充话费/流量', '中国电信', '中国移动', '中国联通', '京东通信', '170选号',
                '手机壳', '贴膜', '手机存储卡', '数据线', '充电器', '手机耳机', '创意配件', '手机饰品']
        },
        {
            title: '电脑/办公',
            items: ['笔记本', '游戏本', '平板电脑', '平板电脑配件', '台式机', '一体机', '服务器/工作站', '笔记本配件',
                '显示器', 'CPU', '主板', '显卡', '硬盘', '内存', '机箱', '电源散热器', '刻录机/光驱', '声卡/扩展卡']
        },
        {
            title: '家居/家具/家装/厨具',
            items: ['厨具', '家纺', '生活日用', '家装软饰', '灯具', '家具', '全屋定制', '建筑材料', '厨房卫浴', '五金电工', '装修设计',
                '水具酒具', '烹饪锅具', '炒锅', '餐具', '厨房配件', '刀剪菜板', '锅具套装']
        },
        {
            title: '男装/女装/童装/内衣',
            items: ['新品推荐', '连衣裙', 'T恤', '衬衫', '雪纺衫', '短外套', '卫衣', '针织衫', '风衣', '半身裙',
                '当季热卖', '新品推荐', 'T恤', '牛仔裤', '休闲裤', '衬衫', '短裤', 'POLO衫', '羽绒服', '棉服']
        },
        {
            title: '美妆/个护清洁/宠物',
            items: ['礼盒', '美白', '防晒', '面膜', '洁面', '爽肤水', '精华', '眼霜', 'T区护理', '润唇',
                '隔离', '遮瑕', '气垫BB', '粉底', '腮红', '口红/唇膏', '唇釉/唇彩', '睫毛膏', '眼影', '眼线']
        },
        {
            title: '女鞋/箱包/钟表/珠宝',
            items: ['新品推荐', '单鞋', '休闲鞋', '帆布鞋', '妈妈鞋', '布鞋/绣花鞋', '女靴', '踝靴', '马丁靴',
                '真皮包', '单肩包', '手提包', '斜挎包', '双肩包', '钱包', '手拿包', '卡包/零钱包', '钥匙包']
        },
        {
            title: '男鞋/运动/户外',
            items: ['新品推荐', '休闲鞋', '商闲鞋', '正装鞋', '帆布鞋', '凉鞋', '拖鞋', '功能鞋', '增高鞋',
                '跑步鞋', '休闲鞋', '篮球鞋', '帆布鞋', '板鞋', '拖鞋', '运动包', '足球鞋', '乒羽网鞋']
        },
        {
            title: '房产/汽车/汽车用品',
            items: ['最新开盘', '普通住宅', '别墅', '商业办公', '海外房产', '文旅地产',
                '微型车', '小型车', '紧凑型车', '中型车', '中大型车', '豪华车', 'MPV', 'SUV', '跑车',
                '5万以下', '5-8万', '8-10万', '10-15万', '15-25万', '25-40万', '40万以上']
        },
        {
            title: '母婴/玩具乐器',
            items: ['1段', '2段', '3段', '4段', '孕妈奶粉', '特殊配方奶粉', '有机奶粉',
                '米粉/菜粉', '面条/粥', '果泥/果汁', '益生菌/初乳', 'DHA钙铁锌/维生素', '清火/开胃', '宝宝零食',
                'NB', 'S', 'M', 'L', 'XL', 'XXL', '拉拉裤', '成人尿裤', '婴儿湿巾']
        },
        {
            title: '食品/酒类/生鲜/特产',
            items: ['苹果', '橙子', '奇异果/猕猴桃', '火龙果', '榴莲', '芒果', '椰子', '车厘子', '百香果',
                '蛋品', '叶菜类', '根茎类', '葱姜蒜椒', '鲜菌菇', '茄果瓜类', '半加工蔬菜', '玉米', '山药',
                '猪肉', '牛肉', '羊肉', '鸡肉', '鸭肉', '冷鲜肉', '特色肉类', '内脏类', '冷藏', '熟食']
        },
        {
            title: '艺术/礼品鲜花/农资绿植',
            items: ['油画', '版画', '水墨画', '书法', '雕塑艺术', '画册艺术', '衍生品',
                '电子烟', '烟油', '打火机', '烟嘴', '烟盒', '烟斗',
                '创意礼品', '电子礼品', '工艺礼品', '美妆礼品', '熏香', '京东卡', '婚庆节庆']
        },
        {
            title: '医药保健/计生情趣',
            items: ['感冒咳嗽', '补肾壮阳', '补气养血', '止痛镇痛', '耳鼻喉用药', '眼科用药', '口腔用药', '皮肤用药',
                '增强免疫', '调节三高', '缓解疲劳', '减肥塑身', '美容养颜', '补肾强身', '肠胃养护', '明目益智',
                '阿胶', '蜂蜜/蜂产品', '枸杞', '燕窝', '冬虫夏草', '人参/西洋参', '三七', '鹿茸']
        },
        {
            title: '图书/音像/电子书',
            items: ['小说', '散文', '随笔', '青春文学', '传记', '动漫', '悬疑推理', '科幻', '武侠', '世界名著',
                '0-2岁', '3-6岁', '7-10岁', '11-14岁', '儿童文学', '绘本', '科普百科', '幼儿启蒙', '智力开发',
                '教材', '中小学教辅', '考试', '外语学习', '字典词典', '课外读物', '英语四六级', '会计类考试']
        },
        {
            title: '机票/酒店/旅游/生活',
            items: ['国内机票', '国际机票', '火车票', '机场服务', '机票套餐',
                '国内酒店', '国际酒店', '酒店套餐', '超值精选',
                '国内旅游', '出境旅游', '全球签证', '景点门票', '邮轮旅行保险',
                '企业差旅', '团队建设', '奖励旅游', '会议周边', '会议展览']
        },
        {
            title: '理财/众筹/白条/保险',
            items: ['京东小金库', '基金理财', '定期理财',
                '智能硬件', '流行文化', '生活美学', '公益', '其他权益众筹',
                '类固收', '私募股权', '阳光私募', '投资策略',
                '京东白条', '白条联名卡', '京东钢镚', '旅游白条', '安居白条', '校园金融', '京东金采',
                '京东支付', '车险', '健康险', '意外险', '旅行险']
        },
        {
            title: '安装/维修/清洗保养',
            items: ['空调安装', '电视安装', '洗衣机安装', '热水器安装', '烟机/灶具安装', '净水器安装',
                '电脑安装', '办公设备安装', '家具安装', '灯具安装', '智能家居安装', '五金卫浴安装', '晾衣架安装',
                '空调维修', '电视维修', '洗衣机维修', '冰箱维修', '热水器维修', '油烟机维修', '燃气灶维修',
                '屏幕换新', '电池换新', '手机故障', '保障服务', '笔记本维修', '平板维修']
        }
    ];

    const fsCol1 = document.getElementById('fs_col1');
    const tulList = document.getElementById('tul');

    if (fsCol1 && tulList) {
        // 创建悬浮菜单容器
        const hoverMenu = document.createElement('div');
        hoverMenu.className = 'hover-menu';
        fsCol1.appendChild(hoverMenu);

        // 获取所有列表项（HTML中的17个分类）
        const listItems = tulList.querySelectorAll('li');

        // 为每个列表项添加悬停事件
        listItems.forEach((item, index) => {
            // 处理所有17个分类
            if (index < fullCategories.length) {
                item.addEventListener('mouseenter', function () {
                    showCategoryMenu(index);
                });
            }
        });

        // 鼠标离开菜单区域时隐藏
        fsCol1.addEventListener('mouseleave', function () {
            hoverMenu.style.display = 'none';
        });

        // 菜单的鼠标事件
        hoverMenu.addEventListener('mouseenter', function () {
            // 鼠标进入菜单，不清除
        });

        hoverMenu.addEventListener('mouseleave', function () {
            hoverMenu.style.display = 'none';
        });

        // 显示分类菜单的函数
        function showCategoryMenu(index) {
            const category = fullCategories[index];
            if (!category) return;

            // 生成菜单内容 - 使用CSS类名替代内联样式
            hoverMenu.innerHTML = `
                <h3 class="hover-menu-title">${category.title}</h3>
                <div class="hover-menu-container">
                    ${category.items.map(item => `
                        <div class="hover-menu-item">
                            <a href="#" class="hover-menu-link">${item} ></a>
                        </div>
                    `).join('')}
                </div>
            `;
            hoverMenu.style.display = 'block';
        }
    }
    /*右侧工具栏*/
    $("#toolbar div a").hover(function () {
        $(this).css("backgroundColor", "#C81623");
        $(this).children("span").toggle();
    }, function () {
        $(this).css("backgroundColor", "#7A6E6E");
        $(this).children("span").css("display", "none");
    })
    $('.t5 a').click(function (e) {
        e.preventDefault();
        //平滑过渡                      瞬间回顶
        $('html, body').animate({ scrollTop: 0 }, 500);
    });


    var target = $(".lbt ul").position().left;
    var num = 0;
    var timer = setInterval(autoplay, 3000);
    // 只添加这一部分（鼠标悬停暂停功能）
    $(".lbt").hover(
        function () {
            clearInterval(timer); // 鼠标进入暂停
        },
        function () {
            timer = setInterval(autoplay, 3000); // 鼠标离开继续
        }
    );
    function autoplay() {
        target -= 590;
        num++;
        $(".lbt ul").animate({ "left": target }, 1000);
        if (target == -590 * 8) {
            target = 0;
            $(".lbt ul").animate({ "left": target }, 0);
        }
        if (num == 7) {
            num = -1;
        }
    }
})