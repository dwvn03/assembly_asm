import { EffectCreative, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-creative";
import './TestCase.css';

const TestCase = ({ testCaseImgs }) => {
    let isSingle = testCaseImgs.length > 1 ? false : true;

    return (
        <Swiper
            modules={[ EffectCreative ,Navigation, Pagination ]}
            spaceBetween={ 10 }
            slidesPerView={ 1 }
            rewind={ true }
            grabCursor={ !isSingle }
            effect={"creative"}
            creativeEffect={{
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
            }}
            navigation={ !isSingle }
            pagination={{ clickable: true }}
        >
            { testCaseImgs.map((image, id) => (
                <SwiperSlide key={ id }  >
                    <img src={ image } />
                </SwiperSlide>
            )) }
        </Swiper>
    )
}

export default TestCase