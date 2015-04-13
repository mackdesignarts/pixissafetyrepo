using SafetyTraining.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SafetyTraining.Web.Controllers
{
    public class SigninSheetController : Controller
    {        

        // TODO: multiple classes not found

        //http://www.mono-software.com/blog/post/Mono/233/Async-upload-using-angular-file-upload-directive-and-net-WebAPI-service/
		//FileStreamResult

        /// <summary>
        /// PDF/1
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		public ActionResult pdf(int id)
		{
			var regionId = GetUsersRegion();

            var @class= db.Classes.Where(x => x.ClassID == id && x.RegionID == regionId).SingleOrDefault();

            var signinSheet = @class.ClassSignInSheets.FirstOrDefault();

			if (signinSheet != null)
			{
				var workStream = new MemoryStream();

				workStream.Write(signinSheet.SignInSheet, 0, signinSheet.SignInSheet.Length);
				workStream.Position = 0;
				return File(workStream, "application/pdf");
			}
			return HttpNotFound();
		}

        /// <summary>
        /// POST: SigninSheet/1
        /// </summary>
        /// <param name="id">id of the class</param>
        /// <param name="file">pdf, jpg, gif, png</param>
        /// <returns></returns>
        //[HttpPost]
        //public ActionResult Index(int id, HttpPostedFileBase file)
        //{
        //    if (file.ContentLength > 0)
        //    {
        //        try
        //        {
        //            byte[] fileData;
        //            var isPDF = file.ContentType.Equals("application/pdf");

        //            var regionId = GetUsersRegion();

        //            var @class = db.Classes.Where(x => x.ClassID == id && x.RegionID == regionId).SingleOrDefault();

        //            var signinSheet = @class.ClassSignInSheets.FirstOrDefault();

        //            if (signinSheet == null)//if not found need to add a new record to the database
        //            {
        //                signinSheet = new ClassSignInSheet() { ClassID = id, SignInSheet = new byte[0] };
        //                db.ClassSignInSheets.Add(signinSheet);
        //            }

        //            if (isPDF)
        //            {
        //                //if this is a PDF then get the bytes and add it to the object
        //                using (var reader = new BinaryReader(file.InputStream))
        //                {
        //                    fileData = reader.ReadBytes((int)file.ContentLength);
        //                }
        //            }
        //            else
        //            {//assume its a image type (gif, jpg, png, etc)
        //                fileData = ConvertImageToPdf(file.InputStream);
        //            }

        //            signinSheet.SignInSheet = ConcatAndAddContent(new List<byte[]>() { signinSheet.SignInSheet, fileData });


        //            db.SaveChanges();
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex.InnerException;
        //        }
        //    }

        //    return Redirect("~/#!/class/detail/" + id);
        //}

        /// <summary>
        /// Converts an image (gif, png, jpg, etc) into a pdf
        /// </summary>
        /// <param name="src"></param>
        /// <returns></returns>
        //private static byte[] ConvertImageToPdf(Stream src)
        //{
        //    iTextSharp.text.Rectangle pageSize = null;

        //    using (var srcImage = new Bitmap(System.Drawing.Image.FromStream(src)))
        //    {
        //        pageSize = new iTextSharp.text.Rectangle(0, 0, PageSize.LETTER.Width, PageSize.LETTER.Height);//srcImage.Width, srcImage.Height);
        //        using (var ms = new MemoryStream())
        //        {
        //            var document = new iTextSharp.text.Document(pageSize, 0, 0, 0, 0);
        //            iTextSharp.text.pdf.PdfWriter.GetInstance(document, ms).SetFullCompression();
        //            document.Open();
        //            src.Position = 0;
        //            var image = iTextSharp.text.Image.GetInstance(src);
        //            image.Alignment = iTextSharp.text.Image.ALIGN_CENTER | iTextSharp.text.Image.ALIGN_MIDDLE;
        //            document.Add(image);
        //            document.Close();

        //            return ms.ToArray();
        //        }
        //    }

        //}   

        /////// <summary>
        /////// 
        /////// </summary>
        /////// <param name="byteArrayIn"></param>
        /////// <returns></returns>
        ////private System.Drawing.Image byteArrayToImage(byte[] byteArrayIn)
        ////{
        ////    MemoryStream ms = new MemoryStream(byteArrayIn);
        ////    System.Drawing.Image returnImage = System.Drawing.Image.FromStream(ms);
        ////    return returnImage;
        ////}

        ///// <summary>
        ///// Take all of the bytes and combine them into a single pdf. This assumes that all items are pdfs.
        ///// </summary>
        ///// <param name="pdf"></param>
        ///// <returns></returns>
        //private static byte[] ConcatAndAddContent(List<byte[]> pdf)
        //{
        //    byte[] all;

        //    using (MemoryStream ms = new MemoryStream())
        //    {
        //        Document doc = new Document();

        //        PdfWriter writer = PdfWriter.GetInstance(doc, ms);

        //        doc.SetPageSize(PageSize.LETTER);
        //        doc.Open();
        //        PdfContentByte cb = writer.DirectContent;
        //        PdfImportedPage page;

        //        PdfReader reader;
        //        foreach (byte[] p in pdf)
        //        {
        //            if (p.Length == 0) { continue; }
        //            reader = new PdfReader(p);
        //            int pages = reader.NumberOfPages;

        //            // loop over document pages
        //            for (int i = 1; i <= pages; i++)
        //            {
        //                doc.SetPageSize(PageSize.LETTER);
        //                doc.NewPage();
        //                page = writer.GetImportedPage(reader, i);
        //                cb.AddTemplate(page, 0, 0);
        //            }
        //        }

        //        doc.Close();
        //        all = ms.GetBuffer();
        //        ms.Flush();
        //        ms.Dispose();
        //    }

        //    return all;
        //}
		private PixisSafetyDBEntities db = new PixisSafetyDBEntities();
		protected override void Dispose(bool disposing)
		{
			if (disposing)
			{
				db.Dispose();
			}
			base.Dispose(disposing);
		}
		private byte? GetUsersRegion()
		{
			byte? regionId = 0;

            IEnumerable<string> headerValues = Request.Headers.GetValues("UserId");

            if (headerValues != null)
			{
                var UserId = int.Parse(headerValues.FirstOrDefault());
				var user = db.Users.FirstOrDefault(ua => ua.UserID == UserId);
                //var user = db.UserAccesses.FirstOrDefault(ua => ua.UserID == UserId);
				if (user != null)
				{
					regionId = user.RegionID;
				}
			}

			return regionId;
		}
	}
}