# Indian Districts Choropleth Template

This is a template for a choropleth map of Indian Districts, optimized for web viewing.

There are a total of 662 districts on the map based on 2011 census, Telangana state's 31 districts, along with some updated district names as of 2018. As of March 2019, there are 722 districts in India, but the latest shapefiles have not yet been liberated. The source of the shapefiles used in this repo is Data{Meet} and Openstreetmap.

Note that these geometries have been overly simplified for the explicit purpose of optimized web-based consumption. Therefore the boundaries are not at all accurate at high zoom levels. The focus here is only on the visualization and not accuracy.

One clear issue is that the boundary of the Telangana state in the Data{Meet} source spreads across two districts of Andhra Pradesh - East and West Godavari.

You can see a sample here: fieldmaps.in/testmaps/choropleth-india-districts

*JS Dependencies*

Uses the following javascript libraries: leaflet, jQuery, Bootstrap, popper.
