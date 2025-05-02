function notificationColor(category) {
  switch (category) {
    case "ORDER_PLACED":
      return { bg: "bg-green-50", text: "text-green-700" };
    case "NEW_MESSAGE":
      return { bg: "bg-blue-50", text: "text-blue-700" };
    case "ORDER_CANCELLED":
      return { bg: "bg-red-50", text: "text-red-700" };
    case "ORDER_DISPATCHED":
      return { bg: "bg-yellow-50", text: "text-yellow-700" };
    case "ORDER_DELIVERED":
      return { bg: "bg-teal-50", text: "text-teal-700" };
    case "ORDER_OUT_FOR_DELIVERY":
      return { bg: "bg-indigo-50", text: "text-indigo-700" };
    case "FLASH_SALE_ALERT":
      return { bg: "bg-pink-50", text: "text-pink-700" };
    case "REVIEW_REMINDER":
      return { bg: "bg-yellow-100", text: "text-yellow-800" };
    case "PROFILE_UPDATED":
      return { bg: "bg-gray-50", text: "text-gray-700" };
    case "REFUND_PROCESSED":
      return { bg: "bg-blue-100", text: "text-blue-800" };
    case "ACCOUNT_SUSPENDED":
      return { bg: "bg-red-100", text: "text-red-800" };
    default:
      return { bg: "bg-gray-50", text: "text-gray-700" };
  }
}

export default notificationColor;
