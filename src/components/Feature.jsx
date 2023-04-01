import React from 'react';
import FeatureBox from './FeatureBox';
import featureImage1 from '../images/feature1.png';
import featureImage2 from '../images/feature2.png';
import featureImage3 from '../images/feature3.png';

const Feature = () => {

    const featureItem = [
        {
            image: featureImage1,
            title: "Belajar Kapan Saja",
            desc: "Jangan khawatir. Dengan Peers, kalian dapat belajar kapan saja, bahkan di waktu luang kalian."
        },
        {
            image: featureImage2,
            title: "Belajar Di Mana Saja",
            desc: "Belajar tidak harus terbatas pada ruang kelas. Dengan Peers, kalian bisa belajar di mana saja."
        },
        {
            image: featureImage3,
            title: "Belajar Bersama Tutor Berkualitas",
            desc: "Dengan Peers, kalian dapat memahami materi dengan lebih baik bersama tutor berkualitas. "
        },
    ]

    return (
        <div id='features'>
            <div className='a-container'>
                {
                    featureItem.map((item, index) => (
                        <FeatureBox key={index} image={item.image} title={item.title} desc={item.desc} />
                    ))
                }
            </div>
        </div>
    );
}

export default Feature;