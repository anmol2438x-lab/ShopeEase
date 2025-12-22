import React from "react";
import { toast } from "react-toastify";

function toastNotification( text, title, type = 'success') {
  toast[type](
    <div className="flex items-start">
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{text}</p>
        {title && <p className="mt-1 text-sm text-gray-500">{title}</p>}
      </div>
    </div>,
    {
      position: "bottom-right",
    }
  );
}

export default toastNotification;
