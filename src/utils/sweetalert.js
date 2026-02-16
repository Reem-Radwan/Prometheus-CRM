import Swal from 'sweetalert2';

export const showSuccessToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: '#10B981',
    customClass: {
      popup: 'colored-toast',
      container: 'swal2-top-container',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: 'success',
    title: message,
  });
};

export const showErrorToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: '#EF4444',
    customClass: {
      popup: 'colored-toast',
      container: 'swal2-top-container',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: 'error',
    title: message,
  });
};

export const showInfoToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: '#3B82F6',
    customClass: {
      popup: 'colored-toast',
      container: 'swal2-top-container',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: 'info',
    title: message,
  });
};

export const showWarningToast = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: '#F59E0B',
    customClass: {
      popup: 'colored-toast',
      container: 'swal2-top-container',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon: 'warning',
    title: message,
  });
};

export const showDeleteConfirmation = (title = 'Are you sure?', text = 'You won\'t be able to revert this!') => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-xl',
      confirmButton: 'px-6 py-3 rounded-lg font-semibold',
      cancelButton: 'px-6 py-3 rounded-lg font-semibold',
      container: 'swal2-top-container',
    },
  });
};

export const showLogoutConfirmation = () => {
  return Swal.fire({
    title: 'Confirm Logout',
    text: 'Are you sure you want to logout from your account?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Logout',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'rounded-xl',
      confirmButton: 'px-6 py-3 rounded-lg font-semibold',
      cancelButton: 'px-6 py-3 rounded-lg font-semibold',
      container: 'swal2-top-container',
    },
  });
};

export const showConfirmDialog = (title, text, confirmText = 'Confirm', cancelText = 'Cancel') => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#2563EB',
    cancelButtonColor: '#6B7280',
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    customClass: {
      popup: 'rounded-xl',
      confirmButton: 'px-6 py-3 rounded-lg font-semibold',
      cancelButton: 'px-6 py-3 rounded-lg font-semibold',
      container: 'swal2-top-container',
    },
  });
};

// Custom styles for toasts and dialogs - inject into head
const style = document.createElement('style');
style.textContent = `
  /* Ensure SweetAlert2 appears above everything including the header (z-index: 1200) */
  .swal2-container.swal2-top-container {
    z-index: 9999 !important;
  }
  
  /* Toast positioning - higher up and closer to top */
  .swal2-container.swal2-top-end {
    top: 20px !important;
    right: 20px !important;
  }
  
  /* Make toast notifications smaller and more compact */
  .colored-toast {
    width: 320px !important;
    padding: 12px 16px !important;
  }
  
  .colored-toast .swal2-icon {
    width: 32px !important;
    height: 32px !important;
    margin: 0 12px 0 0 !important;
  }
  
  .colored-toast .swal2-icon .swal2-icon-content {
    font-size: 20px !important;
  }
  
  .colored-toast .swal2-title {
    color: #1F2937;
    font-size: 14px !important;
    font-weight: 500;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .colored-toast .swal2-timer-progress-bar {
    height: 3px !important;
  }
  
  .colored-toast.swal2-icon-success {
    background-color: #ECFDF5 !important;
  }
  .colored-toast.swal2-icon-error {
    background-color: #FEF2F2 !important;
  }
  .colored-toast.swal2-icon-warning {
    background-color: #FFFBEB !important;
  }
  .colored-toast.swal2-icon-info {
    background-color: #EFF6FF !important;
  }
  
  .swal2-popup {
    font-family: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }
`;
document.head.appendChild(style);

