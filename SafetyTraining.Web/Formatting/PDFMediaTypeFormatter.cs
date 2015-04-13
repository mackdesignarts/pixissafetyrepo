using RazorEngine;
using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using NReco.PdfGenerator;

namespace SafetyTraining.Web.Formatting
{
    public class PDFMediaTypeFormatter : BufferedMediaTypeFormatter
    {

        public PDFMediaTypeFormatter()
        {

            SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/pdf"));
        }
        public PDFMediaTypeFormatter(MediaTypeMapping mediaTypeMapping)
            : this()
        {

            MediaTypeMappings.Add(mediaTypeMapping);
        }
        public PDFMediaTypeFormatter(IEnumerable<MediaTypeMapping> mediaTypeMappings)
            : this()
        {

            foreach (var mediaTypeMapping in mediaTypeMappings)
            {
                MediaTypeMappings.Add(mediaTypeMapping);
            }
        }

        public override void SetDefaultContentHeaders(Type type, HttpContentHeaders headers, MediaTypeHeaderValue mediaType)
        {
            base.SetDefaultContentHeaders(type, headers, mediaType);
            headers.Add("Content-Disposition", "attachment; filename=Export.pdf");
        }

        public override bool CanReadType(Type type)
        {
            return false;
        }

        public override bool CanWriteType(Type type)
        {

            if (type == null)
                throw new ArgumentNullException("type");

            return isTypeOfIEnumerable(type);
        }

        public override void WriteToStream(Type type, object value, Stream stream, HttpContent content)
        {
            writeStream(type, value, stream, content.Headers);
        }

        //private utils
        static String splitCamelCase(String s)
        {
            return Regex.Replace(s, @"(\B[A-Z]+?(?=[A-Z][^A-Z])|\B[A-Z]+?(?=[^A-Z]))", " $1");
        }

        private void writeStream(Type type, object value, Stream stream, HttpContentHeaders contentHeaders)
        {

            //NOTE: We have check the type inside CanWriteType method
            //If request comes this far, the type is IEnumerable. We are safe.

            Type itemType = type.GetGenericArguments()[0];

            StringWriter _stringWriter = new StringWriter();

            _stringWriter.WriteLine(
                string.Join<string>(
                    ",", itemType.GetProperties().Select(x => splitCamelCase(x.Name))
                )
            );


            var pdfBytes = (new NReco.PdfGenerator.HtmlToPdfConverter()).GeneratePdf(makeHtml(value));

            var binaryWriter = new BinaryWriter(stream);
            binaryWriter.Write(pdfBytes);
            binaryWriter.Flush();
        }

        private string makeHtml(dynamic value) {
            
            StringWriter _stringWriter = new StringWriter();


            //foreach (var obj in (IEnumerable<dynamic>)value)
            //{

            //    var vals = obj.GetType().GetProperties().Select(
            //        pi => new
            //        {
            //            Value = pi.GetValue(obj, null)
            //        }
            //    );

            //    string _valueLine = string.Empty;

            //    _stringWriter.WriteLine("<div>");

            //    foreach (var val in vals)
            //    {

            //        if (val.Value != null)
            //        {

            //            var _val = val.Value.ToString();

            //            if (_val.StartsWith("System."))
            //            {
            //                _stringWriter.WriteLine(makeHtml(val.Value));
            //            }
            //            else
            //            {
            //                _stringWriter.WriteLine(string.Concat("<span>", _val, "</span>"));
            //            }
            //        }
            //    }
            //    _stringWriter.WriteLine("</div>");
            //}
            return _stringWriter.ToString();
        }
        private bool isTypeOfIEnumerable(Type type)
        {

            foreach (Type interfaceType in type.GetInterfaces())
            {

                if (interfaceType == typeof(IEnumerable))
                    return true;
            }

            return false;
        }

    }
}