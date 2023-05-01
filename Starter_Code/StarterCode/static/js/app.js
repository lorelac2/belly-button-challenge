// Get URL, fetch JSON data and console log it 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(data => {
    console.log(data);

    function init() {

        // Create dropdown menu with the names using D3 
        let dropdowns = d3.select("#selDataset");
        let names = data.names;
        names.forEach((id) => {
            dropdowns.append("option").text(id);
        });

        // Initialize with the first ID in the list
        let initial_sample = names[0];
        let datas = data.metadata;
        let initial_datas = datas.filter(subject => initial_sample);
        // Set key and value pairs 
        Object.entries(initial_datas[0]).forEach(([key,value]) => {
            d3.select('#sample-metadata').append("h6").text(`${key}: ${value}`);
        });
    
        // Get values for charts
        let samples = data.samples;
        let subject_samples = samples.filter(subject => initial_sample);
        let values = subject_samples[0].sample_values;
        let ID = subject_samples[0].otu_ids;
        let x = values.slice(0,10).reverse();
        let y = ID.slice(0,10).map(id => `OTU ${id}`).reverse();
        let labels = subject_samples[0].otu_labels;
        let hover = labels.slice(0,10).reverse();

        // Set trace and layout and create bar chart 
        let bar_trace = {
            x: x,
            y: y,
            text: hover,
            type: 'bar',
            orientation: 'h'
        };
        let bar_layout = {
            xaxis: "OTU ID Number";
            title: "Top 10 OTUs Found"
        };
        Plotly.newPlot("bar", [bar_trace], bar_layout);
    
        // Set trace and layout and create bubble chart
        let bubble_trace = {
            x: ID,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: values,
                color: ID,
            }
        };
        let bubble_layout = {
            xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", [bubble_trace], bubble_layout)
    }

    // Update when new ID is chosen
    function updates(datas) {
        init(datas);
    }
  });