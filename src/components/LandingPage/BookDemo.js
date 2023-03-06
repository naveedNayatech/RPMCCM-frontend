import React, { Fragment } from 'react'

const BookDemo = () => {
    return (
        <Fragment>
             {/************************ Appointment Section  *************************************/}
                <section id="book_a_demo"  className="section appointment rpm_devices-section">
                  <div className="container">
            
                    <div className="section-title">
                      <h2>Book a Demo</h2>
                    </div>
            
                    <form accept="" role="form" className="php-email-form">
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-4 form-group">
                          <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" />
                        </div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" />
                        </div>
                      </div>
        
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <input type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" />  
                        </div>
        
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                          <input type="datetime" name="date" className="form-control datepicker" id="date" placeholder="Appointment Date" />  
                        </div>  
                      </div>
                      
                      <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 form-group mt-2">
                          <textarea className="form-control" name="message" rows="5" placeholder="Message (Optional)"></textarea>
                        </div>
                      </div>
                      
                      <div className="text-center"><button type="submit">Book Demo</button></div>
                    </form>
            
                  </div>
                </section>
                 {/**************************** End Appointment Section  ****************************/}
        </Fragment>
    )
}

export default BookDemo
