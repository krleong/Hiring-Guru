import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductFeatures.css';
import ReviewCards from '../ReviewCards/ReviewCards';
 

function ProductFeatures() {
    return (
        <div>
            <div class="container">
                    <div id="grid-layout-1" class="grid-layout-1-1 spacer-small"></div>
                <div class="grid-container">
                    <div id="grid-layout-1" class="grid-layout-1-1 row 1">
                        <div class="grid-item-1 grid-item">
                            <div><img class="product-img" src="assets/jobs.webp" alt="Screenshot of jobs page" /></div>
                        </div>
                        <div class="grid-item-2 grid-item">
                            <div><h1 class="header">TAKE COMPLETE CONTROL</h1></div>
                            <div><h5 class="chapter">Easily orchestrate all your hiring campaigns from one place</h5></div>
                            <div><h5 class="text">Get full control of your entire hiring strategy and start making better decisions.
                                Keep all candidates and hiring data stored securely in one place giving you total
                                visibility across each hiring drive.</h5></div>
                        </div>
                    </div>
                    <div id="grid-layout-1" class="grid-layout-1-1 spacer"></div>
                    <div id="grid-layout-1" class="grid-layout-1-1 row 2">
                        <div class="grid-item-1 order-2 order-md-1">
                            <div><h1 class="header">REDUCE HIRING COSTS</h1></div>
                            <div><h5 class="chapter">Be smarter and significantly decrease your hiring spend</h5></div>
                            <div><h5 class="text">Wasting too much money recruiting people? With GoHire,
                                you get all the hiring tools you need. Publish to 15+ job sites with one click,
                                for free, and get 100’s of candidates for every job you advertise.</h5></div>
                        </div>
                        <div class="grid-item-2 grid-item order-1 order-md-2">
                            <div><img class="product-img" src="assets/integrations.webp" alt="Screenshot of integrations page" /></div>
                        </div>
                    </div>
                    <div id="grid-layout-1" class="grid-layout-1-1 spacer"></div>
                    <div id="grid-layout-1" class="grid-layout-1-1 row 3">
                        <div class="grid-item-1 grid-item">
                            <div><img class="product-img" src="assets/candidate_analytics.webp" alt="Screenshot of candidate analytics page" /></div>
                        </div>
                        <div class="grid-item-2 grid-item"><div>
                            <h1 class="header">SAVE MORE TIME</h1></div>
                            <div><h5 class="chapter">Cut time to hire and increase efficiency across your business</h5></div>
                            <div> <h5 class="text">Up your team’s ability to continually improve how you hire with
                                specific job and candidate reporting, ensuring you aren’t wasting time finding, selecting
                                and hiring the best candidates.</h5></div>
                        </div>
                    </div>
                    <div id="grid-layout-1" class="grid-layout-1-1 spacer"></div>
                    <div id="grid-layout-1" class="grid-layout-1-1 row 4">
                        <div class="grid-item-1 grid-item order-2 order-md-1">
                            <div><h1 class="header">HIRE BETTER PEOPLE</h1> </div>
                            <div><h5 class="chapter">Increase top hires and select the best people for the job</h5></div>
                            <div><h5 class="text">Get all the tools you need to evaluate every candidate quickly.
                                Choose from an array of selection tools like screening questions, questionnaires and
                                evaluations to make better hiring decisions.</h5></div>
                        </div>
                        <div id="type" class="grid-item-2 grid-item order-1 order-md-2">
                            <div><img class="product-img" src="assets/candidate_profile.webp" alt="Screenshot of candidate profile page" /></div>
                        </div>
                    </div>
                    <div id="grid-layout-1" class="grid-layout-1-1 spacer-small"></div>
                    <hr/>
                    <div id="grid-layout-1" class="grid-layout-1-1 spacer-small"></div>
                    <div><h5 id="review-header" class="chapter">See what our customers have to say</h5></div>
                    <ReviewCards></ReviewCards>
                </div>
            </div>
        </div>
    );
}

export default ProductFeatures;