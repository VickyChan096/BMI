let checkBtn = document.getElementById('checkBtn');
let inputHeight = document.getElementById('inputHeight');
let inputWeight = document.getElementById('inputWeight');
let list = document.querySelector('.main__list');
let data = JSON.parse(localStorage.getItem('bmiData')) || [];

function countBMI() {
  let bmi = inputWeight.value / [(inputHeight.value/100) * (inputHeight.value/100)];
  bmi = parseFloat(bmi.toFixed(2));
  let className;
  let result;
  let classNameBg;

  if (inputHeight.value === '') {
    alert('請輸入身高');
    return;
  }

  if (inputWeight.value === '') {
    alert('請輸入體重');
    return;
  }

  if(bmi<18.5){
    className = 'btnUnderweight';
    result = '過輕';
    classNameBg = 'underweight';
  }else if(18.5<=bmi && bmi<25){
    className = 'btnNormal';
    result = '理想';
    classNameBg = 'normal';
  }else if(25 <= bmi && bmi < 30){
    className = 'btnOverweight';
    result = '過重';
    classNameBg = 'overweight';
  }else if(30 <= bmi && bmi <35){
    className = 'btnObese1';
    result = '輕度肥胖';
    classNameBg = 'obese1';
  }else if(35 <= bmi && bmi < 40){
    className = 'btnObese2';
    result = '中度肥胖';
    classNameBg = 'obese2';
  }else{
    className = 'btnObese3';
    result = '重度肥胖';
    classNameBg = 'obese3';
  }
  checkBtn.innerHTML = `
  <div class="header__btn btn btnResule ${className}"> 
      <span>${result}</span>
      <p>${bmi}</p>
      <sup>BMI</sup>
      <div class="${classNameBg}"></div>
  </div>`;

  let height = inputHeight.value;
  let weight = inputWeight.value;
  let now =new Date();
  let time = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
  let bmiList ={
    result: result, 
    bmi: bmi, 
    height: height, 
    weight: weight,
    classNameBg: classNameBg,
    time: time
  };
  data.push(bmiList);
  updateList();
  localStorage.setItem('bmiData', JSON.stringify(data));
}
checkBtn.addEventListener('click', countBMI);
updateList();

function updateList(){
  let str = '';
  for (let i = 0; i < data.length; i++) {
    let content = `<li class="card">
            <ul class="card__note">
              <li class="card__note__result">
                <div class="${data[i].classNameBg}"></div>
                <p>${data[i].result}</p>
              </li>
              <li><sup>BMI</sup><span>${data[i].bmi}</span></li>
              <li><sup>weight</sup><span>${data[i].weight}kg</span></li>
              <li><sup>height</sup><span>${data[i].height}cm</span></li>
              <li><sup>${data[i].time}</sup></li>
            </ul>
          </li>`;
    str += content;
  }
  list.innerHTML = str;
}

//toTop
$(function () {
  $('#toTop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 1000);
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
});
