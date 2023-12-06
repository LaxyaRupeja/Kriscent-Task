import React from 'react'

const UserTestimonials = () => {
    const testimonials = [
        {
            id: 1,
            username: "HappyShopper23",
            userPosition: "Frequent Buyer",
            testimonialText: "I've been a loyal customer of this e-commerce platform for years. The variety of products, user-friendly interface, and swift delivery keep me coming back. It's my one-stop shop for all my needs!"
        },
        {
            id: 2,
            username: "FashionistaOnline",
            userPosition: "Style Enthusiast",
            testimonialText: "This e-commerce site has completely elevated my fashion game. The trendy selections, detailed product descriptions, and hassle-free returns make it my preferred destination for online fashion shopping. It's a fashionista's paradise!"
        },
        {
            id: 3,
            username: "TechGuru24x7",
            userPosition: "Gadget Aficionado",
            testimonialText: "I can't get enough of the tech treasures I discover on this e-commerce website. The cutting-edge gadgets, competitive prices, and reliable shipping make it my go-to source for all things tech. Shopping here is a tech enthusiast's dream!"
        }
    ];
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto" >
                <div className="flex flex-wrap -m-4" >
                    {
                        testimonials.map(testimonial => (
                            <div key={testimonial.id} className="lg:w-1/3 lg:mb-0 mb-6 p-4" >
                                <div className="h-full text-center" >
                                    <img alt="testimonial" className="w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://dummyimage.com/400x400" />
                                    <p className="leading-relaxed">{testimonial.testimonialText}</p>
                                    <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                                    <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{testimonial.username}</h2>
                                    <p className="text-gray-500">{testimonial.userPosition}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default UserTestimonials