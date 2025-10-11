import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

function PostImages({ images }) {
    <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
    >
        ...
    </Swiper>
    return (
        <Swiper spaceBetween={10} slidesPerView={1}>
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={img}
                        alt=""
                        className="max-w-[450px] max-h-[650px] object-cover rounded-lg"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
export default PostImages