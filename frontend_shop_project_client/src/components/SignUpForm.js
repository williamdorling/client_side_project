import { useState } from "react";

const SignUpForm = ({setOpenSignUpModal, setListOfCustomers, listOfCustomers}) => {
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        email: "",
        discountCategory: null,
        products:[]
    })

    const discountCategories = [
        {
            id: 0,
            category: "none",
            displayName: "Select a category",
            discountPercent: 0
        },
        {   
            id: 1,
            category: "STUDENT",
            displayName: "Student",
            discountPercent: 10
        },
        {
            id: 2,
            category: "SENIOR_CITIZEN",
            displayName: "Senior citizen",
            discountPercent: 20
        },
        {
            id: 3,
            category: "HEALTHCARE",
            displayName: "Healthcare",
            discountPercent: 20
        },
        {
            id: 4,
            category: "VETERAN",
            displayName: "Veteran",
            discountPercent: 20
        }
    ]

    const discountOptions = discountCategories.map( (discount) => {
        return (<option key={discount.id} value={discount.category}> {discount.displayName} </option>)
    })

    const handleChange = (event) => {
        const propertyName = event.target.name;
        const copiedCustomer = {...newCustomer};
        copiedCustomer[propertyName] = event.target.value;
        setNewCustomer(copiedCustomer);
    }

    const handleDiscountCategoryChange = (event) => {
        const categoryName = event.target.value;
        console.log(categoryName);
        const selectedCategory = discountCategories.find(discount => {
            return discount.category === categoryName;
        });
        console.log(selectedCategory.category);
        if(selectedCategory.category !== "none"){
            const copiedCustomer = {...newCustomer};
            copiedCustomer.discountCategory = selectedCategory.category;
            setNewCustomer(copiedCustomer);
        } else{
            const copiedCustomer = {...newCustomer};
            copiedCustomer.discountCategory = null;
            setNewCustomer(copiedCustomer);
        }
        // console.log(newCustomer);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // POST request to create new customer
        postCustomer(newCustomer);
        // close modals
        setOpenSignUpModal(false);
    }


    const postCustomer = (newCustomer) => {
        fetch("http://localhost:8080/customers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCustomer),
        })
        .then((response) => response.json())
        .then((response) => {
            setListOfCustomers([...listOfCustomers, response])
        })
    };


    return ( 
        <form onSubmit={handleFormSubmit} >
            <input 
                type="text"
                name="name"
                value={newCustomer.name}
                placeholder="enter name"
                onChange={handleChange}
            />

            <input 
                type="email"
                name="email"
                value={newCustomer.email}
                placeholder="enter email"
                onChange={handleChange}
            />

            <select 
                onChange={handleDiscountCategoryChange}
                name="Discount Category"
                value={newCustomer.discountCategory}
            >
                {/* <option value="select-category"> Select a Category </option> */}
                {discountOptions}
            </select>

            <button type="submit">Sign Up</button>
        </form>
     );
}
 
export default SignUpForm;