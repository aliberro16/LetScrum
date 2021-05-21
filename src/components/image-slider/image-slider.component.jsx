import SimpleImageSlider from 'react-simple-image-slider';
import LearnImage from '../../assets/images/slider-badag.jpg';
import About from '../../assets/images/About.jpg';

const ImgSlider = () => {
    const images = [
        { url: LearnImage },
        { url: LearnImage },
        { url: LearnImage },
        { url: LearnImage },
    ];

    return (
        <div>
            <SimpleImageSlider
                width={'1600px'}
                height={'450px'}
                images={images}
                showBullets
                showNavs
            >
                <p> HIIIIIIIIIIIIIIIIIIII</p>
            </SimpleImageSlider>
        </div>
    );
};
export default ImgSlider;
// const Carousel = styled(Slider)`
//     margin-top: 20px;
// `;

// const Wrap = styled.div`
//     border-radius: 4px;
//     cursor: pointer;
//     position: relative;

//     a {
//         border-radius: 4px;
//         box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
//             rgb(0 0 0 / 73%) 0px 16px 10px -10px;
//         cursor: pointer;
//         display: block;
//         position: relative;
//         padding: 4px;

//         img {
//             width: 100%;
//             height: 100px;
//         }

//         &:hover {
//             padding: 0;
//             border: 4px solid rgba(249, 249, 249, 0.8);
//             transition-duration: 300ms;
//         }
//     }
// `;
