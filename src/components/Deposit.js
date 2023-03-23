import React from 'react'
import { useState, useEffect } from "react";
import "./Deposit.css"

function Deposit() {

    const initialValues = { Amount: "", Refference: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
      };

      useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
        }
      }, [formErrors]);

      const validate = (values) => {
        const errors = {};
        
        if (!values.Amount) {
            errors.Amount = "Amount is required!";
        } else if (values.Amount){
            alert("Successfully Deposit")
            
          }

        return errors;
        
  };


  return (
    <div className='container'>
        
        <div>
            <h1>Account Balance: £ 20,000</h1>
            <div>
                
                <form
                        className="form"
                        onSubmit={handleSubmit}
                        autoComplete={"off"}
                    >
                        <div className='Amount'>
                        <h1>Amount (£)</h1>
                            <input
                                        type="number"
                                        className={`block`}
                                        id="Amount"
                                        name="Amount"
                                        value={formValues.Amount}
                                        placeholder="Amount (£)"
                                        onChange={handleChange}
                                    />
                        
                        <p className='error'>{formErrors.Amount}</p>  
                                    
            
                    
                    <h1>Refference</h1>
                        <input
                            type="text"
                            className={`block`}
                            id="Ref"
                            name="Ref"
                            value={formValues.Ref}
                            placeholder="Refference"
                            
                            onChange={handleChange}
                        />
                        </div>

                        
                        <div className="text-center">
                  <div className='btn1'>
                  <button
            
                    
                  >
                    Submit
                  </button>

                  </div>
                 
                </div>
                        
                    </form>
                    
                        </div>

            </div>
        </div>
  )
}

export default Deposit
