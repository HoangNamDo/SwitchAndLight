var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

//Cấu hình cho bóng đèn
var lightConfig = {
    colorOff: '#ffffe6',
    colorOn: '#ffff00',
    radius: 25,
};

//Tạo mảng để quản lý tất cả bóng đèn
var lightList = [];

    //Thêm thông tin bóng đèn vào mảng (vị trí, 2 công tắc mà nó chịu tác động)
    lightList.push({
        x: 100,
        y: 65,       
        switchA: 0,
        switchB: 1,
    });
    lightList.push({
        x: 100,
        y: 260,       
        switchA: 2,
        switchB: 3,
    });
    lightList.push({
        x: 100,
        y: 370,       
        switchA: 3,
        switchB: 4,
    });

//Cấu hình cho công tắc
var switchConfig = {
    color1: '#595959',
    color2: '#ff0000',
    color3: '#00cc00',
    height: 100,
    width: 50,
};

//Tạo mảng để quản lý tất cả các công tắc
var switchList = [];

    //Thêm thông tin công tắc vào mảng (vị trí, trạng thái)
    switchList.push({
        x: 10,
        y: 10,
        status: false,
    });
    switchList.push({
        x: 140,
        y: 10,
        status: true,
    });
    switchList.push({
        x: 10,
        y: 210,
        status: true,
    });
    switchList.push({
        x: 140,
        y: 265,
        status: true,
    });
    switchList.push({
        x: 10,
        y: 370,
        status: true,
    });

//Khởi tạo hàm vẽ MỘT bóng đèn
function drawLight(x, y, switchA, switchB){
    context.beginPath();
    context.arc(x, y, lightConfig.radius, 0, Math.PI*2, false);
    context.lineWidth = 10;
    context.stroke();
    if(switchA == !switchB){
        context.fillStyle = lightConfig.colorOn;
    } else{
        context.fillStyle = lightConfig.colorOff;
    }
    context.fill();
    context.closePath();
}

//Khởi tạo hàm vẽ TẤT CẢ bóng đèn trong mảng
function drawLights(){
    lightList.forEach(function(currentLight){
        drawLight(currentLight.x, currentLight.y, 
            switchList[currentLight.switchA].status, 
            switchList[currentLight.switchB].status);
    })
}

//Khởi tạo hàm vẽ MỘT công tắc
function drawSwitch(x, y, status){
    context.beginPath();
    myRect = context.rect(x, y, switchConfig.width, switchConfig.height);
    context.lineWidth = 10;
    context.stroke();
    context.fillStyle = switchConfig.color1;
    context.fill();
    context.closePath();

    if(!status){
        context.beginPath();
        context.rect(x, y, switchConfig.width, switchConfig.height/2);
        context.stroke();
        context.fillStyle = switchConfig.color2;
        context.fill();
        context.closePath();
    } else{
        context.beginPath();
        context.rect(x, y + switchConfig.height/2, switchConfig.width, switchConfig.height/2);
        context.stroke();
        context.fillStyle = switchConfig.color3;
        context.fill();
        context.closePath();       
    }
}

//Khởi tạo hàm vẽ TẤT CẢ công tắc trong mảng
function drawSwitchs(){
    switchList.forEach(function(currentSwitch){
        drawSwitch(currentSwitch.x, currentSwitch.y, currentSwitch.status);
    });
}

//Khởi tạo hàm kiểm tra MỖI công tắc khi NHẤN CHUỘT tại vị trí BẤT KÌ trong Canvas
function checkSwitchClicked(){
    canvas.onmousedown = function(mousePosition){
        switchList.forEach(function(currentSwitch){
            if(mousePosition.offsetX >= currentSwitch.x
                && mousePosition.offsetX <= currentSwitch.x + switchConfig.width
                && mousePosition.offsetY >= currentSwitch.y
                && mousePosition.offsetY <= currentSwitch.y + switchConfig.height){
                    currentSwitch.status = !currentSwitch.status;
                    drawSwitch(currentSwitch.x, currentSwitch.y, currentSwitch.status);
                    drawLights();
            } 
        })          
    }
}

//Khởi tạo hàm vẽ TẤT CẢ đối tượng
function draw(){
    drawLights();   
    drawSwitchs();
}

//Gọi hàm vẽ TẤT CẢ đối tượng
draw();

//Gọi hàm kiểm tra công tắc có được nhấn hay không?
checkSwitchClicked();
