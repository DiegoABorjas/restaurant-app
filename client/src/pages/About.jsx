import { useQuery } from '@apollo/client';
//import Carousel2 from '../pages/Carousel';

const About = () => {
const test = "test";


return (
    <div className='container'>
        <h3 className="text-center text-lg font-bold mb-4">Welcome to [Restaurant Name]!</h3>

    <p>
        [Restaurant Name] is a [cuisine] restaurant located in [city, state]. We are committed to providing our guests with an unforgettable dining experience, from the moment they walk through 
        
        the door to the moment they leave.

        Our menu features a variety of [cuisine] dishes, all made with fresh, locally-sourced ingredients. We also have a full bar, with a wide selection of wines, beers, and cocktails.

        Our dining room is warm and inviting, with a cozy atmosphere. We also have a private dining room for special occasions.

        Our staff is friendly and attentive, and they are always happy to help you choose the perfect dish and make your dining experience as enjoyable as possible.

        Call to action:

        We hope you will join us soon for a delicious meal and a memorable dining experience. Make a reservation today!</p>

    </div>
);
};

export default About;
