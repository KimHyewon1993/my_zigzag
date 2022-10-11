$(function(){

// header ---------------------------------------------

    let mm = gsap.matchMedia();

    mm.add("(max-width: 1022px)", () => {
        const ham = document.querySelector(".btn-menu");
        const menu = document.querySelector('.gnb');
        const links = menu.querySelectorAll('.gnb-item');

        var tl = gsap.timeline({ paused: true });

        tl.to(menu, {
            duration: 1,
            opacity: 1,
            height: '47vh',
            ease: 'expo.inOut',
            className :'gnb active'
        })
        tl.from(links, {
            duration: 1,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'expo.inOut',
        }, "-=0.5");

        tl.reverse();

        ham.addEventListener('click', () => {
            tl.reversed(!tl.reversed());
        });
    });

    $(window).scroll(function(){
        const currentScroll = $(window).scrollTop();
        const infoScroll = $('.sc-info').offset().top - ($(window).height()/2);
        if(currentScroll > infoScroll) {
            $('.header').addClass('scroll');
            $('.sc-info .text-item:first-child').trigger('click');
        }else {
            $('.header').removeClass('scroll');
        }
    });

// sc-visual ------------------------------------------

    gsap.set('.sc-visual .main-text',{opacity:0,yPercent:-40})
    gsap.set('.sc-visual .sub-desc',{opacity:0})
    gsap.set('.sc-visual .dimmed',{opacity:0})
    gsap.to('.sc-visual .main-text',{
        opacity:1,
        yPercent:-50,
        delay: 1,
        duration: 1
    })
    const mainVis = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc-visual',
            start: '0% 0%',
            end: '+=240%',
            scrub: 1
        }
    })
    mainVis.addLabel('a')
    .to('.sc-visual .main-text span',{ opacity:0 },'a')
    .to('.sc-visual .img-area img',{ scale:1.4},'a')
    .to('.sc-visual .dimmed',{ opacity:1 },'a')
    .to('.sc-visual .sub-desc',{ opacity:1, delay:0.3, stagger: 0.3,},'a+=0.5')
    .to('.bg-wrapper',{ opacity:1})
    
// sc-info ---------------------------------------------

    var swiper3 = new Swiper(".sc-info .img-box", {
        draggable: false,
        speed: 1000,
        effect: "creative",
        creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, "-20%", -1],
        },
        next: {
            translate: [0, "100%", 0],
        },
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

    swiper3.on('slideChangeTransitionStart',function(){
        idx = this.realIndex;
        $('.sc-info .text-item').eq(idx).addClass('active').siblings().removeClass('active');
    })


    $('.sc-info .text-item').click(function(e){
        e.preventDefault();
        idx = $(this).index();
        numVal = $(this).find('.num').data('num');
        swiper3.slideTo(idx)
        if(!$(this).hasClass('active')){
            new numberCounter("numData"+idx, numVal)
        }
        $(this).addClass('active').siblings().removeClass('active');
    })

    /**
     * @frame = '[data-sort=1]'
     * 
     */
    
    function sort(frame,index1,index2,index3,index4){
        current = $(frame).find('.current');

        width1 = $(frame).find('.sort').eq(0).innerWidth();
        height1 = $(frame).find('.sort').eq(0).innerHeight();
        position1 = $(frame).find('.sort').eq(0).position().left;

        width2 = $(frame).find('.sort').eq(1).innerWidth();
        height2 = $(frame).find('.sort').eq(1).innerHeight();
        position2 = $(frame).find('.sort').eq(1).position().left;
        
        width3 = $(frame).find('.sort').eq(2).innerWidth();
        height3 = $(frame).find('.sort').eq(2).innerHeight();
        position3 = $(frame).find('.sort').eq(2).position().left;
        
        width4 = $(frame).find('.sort').eq(3).innerWidth();
        height4 = $(frame).find('.sort').eq(3).innerHeight();
        position4 = $(frame).find('.sort').eq(3).position().left;

        array = [
            [width1,height1,position1],
            [width2,height2,position2],
            [width3,height3,position3],
            [width4,height4,position4]
        ]

            current.delay(1000).animate({left:array[index1][2],width:array[index1][0],height:array[index1][1]},1000)
            current.delay(1000).animate({left:array[index2][2],width:array[index2][0],height:array[index2][1]},1000)
            current.delay(1000).animate({left:array[index3][2],width:array[index3][0],height:array[index3][1]},1000)
            current.delay(1000).animate({left:array[index4][2],width:array[index4][0],height:array[index4][1]},1000)
                        
    }
    sort('[data-sort=1]',2,3,1,0);
    sort('[data-sort=2]',2,1,0,3);
    sort('[data-sort=3]',1,0,3,1);
    setInterval (() => {
        sort('[data-sort=1]',2,3,1,0);
        sort('[data-sort=2]',2,1,0,3);
        sort('[data-sort=3]',1,0,3,1);
    },8000)
    
// sc-review ---------------------------------------------

    var swiper = new Swiper(".sc-review .img-area", {
        draggable: false,
        autoplay: {
            delay: 1700,
            disableOnInteraction: false,
        },
    });

// sc-shopping -------------------------------------------

    shopDesc = [
        '카카오톡 채널 추가하고 1000p 받자',
        '안다르 즐겨찾기 하면 30%할인 쿠폰 증정',
        '지그재그 속 상점 찜하고 돈벌자'
    ]
    
    var swiper = new Swiper(".sc-shopping .swiper", {
        spaceBetween: 0,
        // centeredSlides: true,
        autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        },
        pagination: {
            el: "#numList",
            clickable: true,
            renderBullet: function (index, className) {
                return `
                        <li class="num-item ${className}">
                            <div class="num">
                            ${index+1}
                            </div>
                            <p class="desc">${shopDesc[index]}</p>
                        </li>
                    `
            },
        },
    });

    $(document).on('click','.num-item',function(e){
        e.preventDefault();

        const idx = $(this).index();
        console.log(idx);

        $(this).addClass('active').siblings().removeClass('active');

    
    });

// sc-beauty -------------------------------------------

    var beautySlide1 = new Swiper(".sc-event .img-slide", {
        slidesPerView: 1.5,
        spaceBetween: 70,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2.2,
                spaceBetween: 150,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 20,
                },
            },
    });
    var beautySlide2 = new Swiper(".sc-event .thumb-box", {
        slidesPerView:2,
        loop: true,
        spaceBetween: 50,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });

});

    
    
    
    