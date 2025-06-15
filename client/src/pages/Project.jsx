// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const subscriptions = [
//   {
//     id: 1,
//     title: "Free Plan",
//     description: "Publish 1 blog post for free.",
//     price: 0,
//   },
//   {
//     id: 2,
//     title: "Classic Subscription",
//     description: "Publish up to 20 blog posts.",
//     price: 499,
//   },
//   {
//     id: 3,
//     title: "Pro Subscription",
//     description: "Publish up to 50 blog posts.",
//     price: 999,
//   },
// ];

// export default function Subscription() {
//   const navigate = useNavigate();

//   const handlePayment = (subscription) => {
//     if (subscription.price === 0) {
//       toast.success("You have successfully subscribed to the Free Plan!");
//       navigate("/contact");
//       return;
//     }

//     const options = {
//       key: "",
//       amount: subscription.price * 100, 
//       currency: "INR",
//       name: "Blog Subscription Plan",
//       description: subscription.title,
//       image: "https://dhruvil-nakrani-pf1.netlify.app/assets/img/download1.png",
//       handler: function (response) {
//         toast.success("Successfully purchased subscription!");
//         navigate("/contact");
//       },
//       prefill: {
//         name: "Dhruvil Nakrani",
//         email: "johndoe@example.com",
//         contact: "+91 90338 50651",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
    
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-900">
//       <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400">
//         Subscription Plans
//       </h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {subscriptions.map((subscription) => (
//           <div key={subscription.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
//             <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">{subscription.title}</h2>
//             <p className="text-gray-600 dark:text-gray-400">{subscription.description}</p>
//             <p className="text-teal-600 dark:text-teal-400 font-bold">{subscription.price === 0 ? "Free" : `₹${subscription.price}`}</p>
//             <button
//               onClick={() => handlePayment(subscription)}
//               className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
//             >
//               Buy Subscription
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const subscriptions = [
  {
    id: 1,
    title: "Free Plan",
    description: "Publish 1 blog post for free.",
    price: 0,
  },
  {
    id: 2,
    title: "Classic Subscription",
    description: "Publish up to 20 blog posts.",
    price: 499,
  },
  {
    id: 3,
    title: "Pro Subscription",
    description: "Publish up to 50 blog posts.",
    price: 999,
  },
];

export default function Subscription() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (subscription) => {
    if (subscription.price === 0) {
      toast.success("You have successfully subscribed to the Free Plan!");
      navigate("/contact");
      return;
    }

    setLoading(true);
    
    const options = {
      key: "rzp_test_aVFsXiQpfzHd7p", // Replace with your Razorpay test key
      amount: subscription.price * 100,
      currency: "INR",
      name: "Blog Subscription Plan",
      description: subscription.title,
      image: "https://dhruvil-nakrani-pf1.netlify.app/assets/img/download1.png",
      handler: function (response) {
        toast.success("Successfully purchased subscription!");
        sendPaymentDetails(response.razorpay_payment_id, subscription);
        navigate("/contact");
      },
      theme: {
        color: "#3399cc",
      },
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const sendPaymentDetails = async (paymentId, subscription) => {
    try {
      const formData = new FormData();
      formData.append("access_key", "180e1ac6-537b-4570-a2bd-50bd5b4db710"); // Replace with your Web3Forms API key
      formData.append("subject", "New Subscription Payment");
      formData.append("email", "user123456@gmail.com"); // Replace with the target email
      formData.append("message", `Payment ID: ${paymentId}\nPlan: ${subscription.title}\nAmount: ₹${subscription.price}`);
      
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Payment details successfully sent!");
      } else {
        toast.error("Failed to send payment details.");
      }
    } catch (error) {
      toast.error("Error sending payment details.");
    }
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400">
        Subscription Plans
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">{subscription.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{subscription.description}</p>
            <p className="text-teal-600 dark:text-teal-400 font-bold">{subscription.price === 0 ? "Free" : `₹${subscription.price}`}</p>
            <button
              onClick={() => handlePayment(subscription)}
              className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              disabled={loading}
            >
              {loading ? "Processing..." : "Buy Subscription"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
