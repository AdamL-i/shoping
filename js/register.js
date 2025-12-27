$(document).ready(function () {
    // ================== 第一页：手机号验证 ==================
    // 检查当前页面是否有手机号验证元素
    if ($('#phone').length > 0) {
        // 1 开头，第二位为 3-9
        const phoneRegex = /^1[3-9]\d{9}$/;
        let isPhoneValid = false;

        // 手机号输入验证
        $('#phone').on('input', function () {
            const phone = $(this).val();

            // 只允许输入数字,替换非数字
            $(this).val(phone.replace(/[^\d]/g, ''));

            // 限制为11位
            if (phone.length > 11) {
                $(this).val(phone.substring(0, 11));
                // 截取字符串函数s某
            }

            validatePhone();
        });

        function validatePhone() {
            const phone = $('#phone').val();

            if (phone === "") {
                $('#phoneError').text('请输入手机号码');
                $('#phoneSuccess').text('');
                isPhoneValid = false;
            } else if (!phoneRegex.test(phone)) {
                $('#phoneError').text('请输入有效号码');
                $('#phoneSuccess').text('');
                isPhoneValid = false;
            } else {
                $('#phoneError').text('');
                $('#phoneSuccess').text('✓ 格式正确');
                isPhoneValid = true;
            }
            updateNextButton();
        }

        // 更新下一步按钮状态
        function updateNextButton() {
            // function p获取属性
            $('#nextStep').prop('disabled', !isPhoneValid);
            // dis属性禁用 真or假
        }

        // 下一步按钮点击事件
        $('#nextStep').click(function () {
            if (isPhoneValid) {
                window.location.href = 'regist-step2.html';
            }
        });

        // 失去焦点时验证
        $('#phone').on('blur', function () {
            validatePhone();
        });

        // 初始禁用下一步按钮
        updateNextButton();

        // 协议弹窗相关
        $('#but2').on('click', function () {
            $('#mask').hide();
        });

        // 初始显示协议弹窗
        $('#mask').show();
    }

    // ================== 第二页：账号信息设置 ==================
    // 检查当前页面是否有用户名输入元素
    if ($('#username').length > 0) {
        // 用户名正则：4-20位字母/数字
        const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;

        let isUsernameValid = false;
        let isPasswordValid = false;
        let isConfirmValid = false;

        // 用户名验证
        $('#username').on('input', function () {
            const username = $(this).val().trim();
            if (usernameRegex.test(username)) {
                $('#usernameError').text('');
                $('#usernameSuccess').text('✓ 可用');
                isUsernameValid = true;
            } else {
                $('#usernameError').text('4-20位字母/数字');
                $('#usernameSuccess').text('');
                isUsernameValid = false;
            }
            updateSubmitButton();
        });

        // 密码验证
        $('#password').on('input', function () {
            const password = $(this).val();
            if (password.length >= 6 && password.length <= 20) {
                $('#passwordError').text('');
                $('#passwordSuccess').text('✓ 可用');
                isPasswordValid = true;
            } else {
                $('#passwordError').text('6-20位字符');
                $('#passwordSuccess').text('');
                isPasswordValid = false;
            }
            checkConfirmPassword();
        });

        // 确认密码验证
        $('#confirmPassword').on('input', checkConfirmPassword);

        function checkConfirmPassword() {
            const password = $('#password').val();
            const confirm = $('#confirmPassword').val();

            if (confirm === '') {
                $('#confirmError').text('');
                $('#confirmSuccess').text('');
                isConfirmValid = false;
            } else if (password === confirm) {
                $('#confirmError').text('');
                $('#confirmSuccess').text('✓ 一致');
                isConfirmValid = true;
            } else {
                $('#confirmError').text('密码不一致');
                $('#confirmSuccess').text('');
                isConfirmValid = false;
            }
            updateSubmitButton();
        }

        function updateSubmitButton() {
            const isValid = isUsernameValid && isPasswordValid && isConfirmValid;
            $('#submitBtn').prop('disabled', !isValid);
        }

        // 提交按钮点击事件
        $('#submitBtn').click(function () {
            // 跳转到成功页面
            window.location.href = 'regist-success.html?username=';
        });
        // 初始禁用提交按钮
        updateSubmitButton();
    }

    // ================== 第三页：注册成功页面 ==================
    // 检查当前页面是否有倒计时元素
    if ($('#countdown').length > 0) {
        // 倒计时跳转
        let count = 5;
        const countdownElement = $('#countdown');
        // 定时器
        const countdownInterval = setInterval(function () {
            count--;
            countdownElement.text(count);

            if (count <= 0) {
                // 停止定时器
                clearInterval(countdownInterval);
                window.location.href = 'index.html';
            }
        }, 1000);
        // 时间间隔
    }
});