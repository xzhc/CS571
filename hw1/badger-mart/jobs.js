function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    let jobs = document.getElementsByName("job");
    // console.log(jobs);
    let selectedJob = false;
    for (let job of jobs) {
        if ( job.checked) {
            selectedJob = true;
            alert(`Thank you for applying to be a ${job.value}`)
        }
    }
    if (!selectedJob ) {
        alert("Please select a job to apply for!");    
    }

   
    
}