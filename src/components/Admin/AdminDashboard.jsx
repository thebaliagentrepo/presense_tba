import { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import FAQDropdown from "./FaqDropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const faqData = [
    {
      question: "Recap Presence 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1872701250&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    {
      question: "January 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=186001220&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    {
      question: "February 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSNKF9O06X1xv1PZTifaxXxggzuZWIcbHeMJjCPHio1Qfnpo-YUN0EI2YVbrji2Y0DLx6VouQy_Jeuh/pubhtml?gid=1054695952&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    {
      question: "March 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1563074821&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    {
      question: "April 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSNKF9O06X1xv1PZTifaxXxggzuZWIcbHeMJjCPHio1Qfnpo-YUN0EI2YVbrji2Y0DLx6VouQy_Jeuh/pubhtml?gid=472649234&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    {
      question: "May 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=291231940&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },

    {
      question: "June 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1444461987&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },

    {
      question: "July 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=353015361&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },

    {
      question: "August 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1494957590&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    {
      question: "September 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1691461553&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },

    {
      question: "October 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1310750250&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },

    {
      question: "November 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=334510739&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },

    {
      question: "December 2023",
      answer: (
        <iframe
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSLPxtX3L0xso0g0YJrdD6EsfJvaQof2gPyxOZkeZtIIg8wzVviHRLIQmehOWg7YjyMTnISKFAZkAhF/pubhtml?gid=1656992604&amp;single=true&amp;widget=true&amp;headers=false"
          className="aspect-video w-full h-full"
        ></iframe>
      ),
    },
    // Add more question-answer pairs as needed
  ];
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token_admin");
    if (token == null) {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      <AdminLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4">
            Report Presence The Bali Agent Staff
          </h1>
          <div>
            <Link to="https://docs.google.com/spreadsheets/d/1E5gw2c9LvXftye2FFoxrIGM8LYNiX1nQOrRVlCw10qY/export?format=xlsx">
              <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5">
                Download report
              </button>
            </Link>
          </div>
          <FAQDropdown questions={faqData} />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
