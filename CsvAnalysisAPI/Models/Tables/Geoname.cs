using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CsvAnalysisAPI.Models.Tables
{
    [PetaPoco.TableName("Geonames")]
    public class Geoname
    {
        public int GeonameId { get; set; }
        public string Name { get; set; }
        public string AsciiName { get; set; }
        public string AlternateNames { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string FeatureClass { get; set; }
        public string FeatureCode { get; set; }
        public string CountryCode { get; set; }
        public string CC2 { get; set; }
        public string Admin1Code { get; set; }
        public string Admin2Code { get; set; }
        public string Admin3Code { get; set; }
        public string Admin4Code { get; set; }
        public Int64? Population { get; set; }
        public Int64? Elevation { get; set; }
        public Int64? Dem { get; set; }
        public string TimeZone { get; set; }
        public DateTime? ModificationDate { get; set; }
    }
}