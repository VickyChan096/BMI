let checkBtn = document.getElementById('checkBtn');
let inputHeight = document.getElementById('inputHeight');
let inputWeight = document.getElementById('inputWeight');
let list = document.querySelector('.main__list');
let data = JSON.parse(localStorage.getItem('data')) || [];

function countBMI() {
  let bmi = inputWeight.value / [(inputHeight.value/100) * (inputHeight.value/100)];
  bmi = parseFloat(bmi.toFixed(2));
  let className;
  let span;
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
    span = '過輕';
    classNameBg = 'underweight';
  }else if(18.5<=bmi && bmi<25){
    className = 'btnNormal';
    span = '理想';
    classNameBg = 'normal';
  }else if(25 <= bmi && bmi < 30){
    className = 'btnOverweight';
    span = '過重';
    classNameBg = 'overweight';
  }else if(30 <= bmi && bmi <35){
    className = 'btnObese1';
    span = '輕度肥胖';
    classNameBg = 'obese1';
  }else if(35 <= bmi && bmi < 40){
    className = 'btnObese2';
    span = '中度肥胖';
    classNameBg = 'obese2';
  }else{
    className = 'btnObese3';
    span = '重度肥胖';
    classNameBg = 'obese3';
  }
  checkBtn.innerHTML = `
  <div class="header__btn btn btnResule ${className}"> 
      <span>${span}</span>
      <p>${bmi}</p>
      <sup>BMI</sup>
      <div class="${classNameBg}"></div>
  </div>`;

  let height = inputHeight.value;
  let weight = inputWeight.value;
  let bmiList ={bmiH: height, bmiW: weight};
  data.push(bmiList);
  updateList(data);
  height.value = '';
  weight.value = '';
  localStorage.setItem('bmiData', JSON.stringify(data));
}
checkBtn.addEventListener('click', countBMI);
updateList(data);

function updateList(data){
  let str = '';
  for (let i = 0; i < data.length; i++) {
    let content = `<li class="card">
            <ul class="card__note">
              <li class="card__note__result">
                <div class="normal"></div>
                <p>a</p>
              </li>
              <li><sup>BMI</sup><span>b</span></li>
              <li><sup>weight</sup><span>${data[i].bmiW}kg</span></li>
              <li><sup>height</sup><span>cm</span></li>
              <li><sup>06-19-2017</sup></li>
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
