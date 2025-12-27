$(function () {
    //当我们的全选按钮状态发生改变的时候 
    $(".checkall").change(function () {
        var checked = $(this).prop("checked");
        //同步修改选中和没有选中
        $(".j-checkbox,.checkall").prop("checked", checked);
        //根据是否选中来选择添加class样式 check-cart-item
        if (checked) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    //当我们分别点击每一个按钮的时候 为他们绑定点击事件
    $(".j-checkbox").change(function () {
        //用户选中没有选中 选中为true 没有选中为false
        // prop的意思是根据属性的名称来获取属性的值
        // else就要移除选中的属性 check-cart-item
        var checked = $(this).prop("checked");
        if (checked) {
            $(this).parent().parent().addClass("check-cart-item");
        } else {
            $(this).parent().parent().removeClass("check-cart-item");
        }
        //逻辑补充： 如果用户勾选了三个 则 全选 要自动勾选
        //每次点击单个选中的按钮以后 ，我们来这边判断 当前所有选中的按钮个数是否等于 当前按钮个数
        // console.log($(".j-checkbox").length); 选择框的总个数永远是三个
        if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    })
    //+号 增加商品个数 并且修改小计金额 和总金额
    $(".increment").click(function () {
        // 兄弟元素
        var num = $(this).siblings(".itxt").val();
        num++;
        //设置+1以后的商品数量
        $(this).siblings(".itxt").val(num);
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        price = num * price.substr(1);
        //重新设置小计金额
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        //重新计算总金额
        getSum();
    })
    //-号 减少商品个数 并且计算小计金额和总金额
    $(".decrement").click(function () {
        var num = $(this).siblings(".itxt").val();
        if (num == 1) {
            return;
        }
        num--;
        //设置+1以后的商品数量
        $(this).siblings(".itxt").val(num);
        var price = $(this).parents(".p-num").siblings(".p-price").text();
        price = num * price.substr(1);
        //重新设置小计金额 去掉￥符号
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + price);
        //重新计算总金额
        getSum();
    })

    //删除按钮操作
    $(".p-action a").click(function () {
        // 移除
        $(this).parents(".cart-item").remove();
        //重新计算总金额
        getSum();
    })

    //得到总金额和总数量
    getSum();
    /**
     * 计算总金额和总数量的函数
     */
    function getSum() {
        //总数量
        var totalNum = 0;
        //总金额
        var totalMoney = 0;

        // e遍历 数量
        $(".itxt").each(function (i, n) {
            //他是字符串类型 所以作为字符串拼接在后面了 $(n).val()
            totalNum += parseInt($(n).val());
        })

        //设置总数量
        $(".amount-sum em").text(totalNum);

        $(".p-sum").each(function (i, n) {

            // 去掉￥
            totalMoney += parseFloat($(n).text().substr(1));
        })
        $(".price-sum em").text(totalMoney);
    }
})

