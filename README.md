<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Base styles for Inter font and general layout */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #eef2f6; /* Lighter background for better contrast */
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Ensure it takes full viewport height */
            box-sizing: border-box; /* Include padding in element's total width and height */
        }

        /* Main Dashboard Container - visible after login */
        .dashboard-container {
            display: flex;
            background-color: #fff;
            @apply shadow-2xl rounded-2xl overflow-hidden; /* More pronounced rounded corners and shadow */
            max-width: 1440px; /* Slightly wider max-width */
            width: 100%;
            min-height: 850px; /* Slightly taller min-height */
            visibility: hidden; /* Hidden by default, shown by JS on login */
            opacity: 0; /* Fade in */
            transform: translateY(20px); /* Slight slide-up animation */
            transition: visibility 0s, opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .dashboard-container.visible {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
        }

        /* Login Container - visible before login */
        .login-container {
            background-color: #fff;
            @apply shadow-2xl rounded-2xl p-10 md:p-14 lg:p-16 w-full max-w-md; /* More padding, more rounded */
            text-align: center;
            visibility: visible; /* Visible by default, hidden by JS on login */
            opacity: 1; /* Fade out */
            transform: translateY(0);
            transition: visibility 0s, opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .login-container.hidden {
            visibility: hidden;
            opacity: 0;
            transform: translateY(-20px); /* Slight slide-up animation when hiding */
            position: absolute; /* Prevent taking up space when hidden */
            left: -9999px; /* Move off-screen when hidden */
        }

        /* Login Page Specific Styles (integrated) */
        .login-container .logo {
            font-size: 2.8rem; /* Larger logo text */
            font-weight: 900; /* Extra bold */
            color: #c50c0c; /* Slightly darker red */
            margin-bottom: 2.5rem; /* More spacing */
            letter-spacing: -0.06em; /* tighter letter spacing */
            text-shadow: 1px 1px 2px rgba(0,0,0,0.05); /* Subtle text shadow */
        }
        .login-container .form-group {
            margin-bottom: 1.8rem; /* Increased margin */
            text-align: left;
        }
        .login-container .form-group label {
            display: block;
            font-size: 1rem; /* Slightly larger base */
            font-weight: 600; /* font-semibold */
            color: #374151; /* text-gray-700 */
            margin-bottom: 0.6rem; /* More spacing */
        }
        .login-container .form-group input {
            width: 100%;
            padding: 1rem 1.25rem; /* More padding */
            border: 1px solid #d1d5db; /* border-gray-300 */
            border-radius: 0.75rem; /* More rounded */
            font-size: 1.05rem; /* Slightly larger text */
            color: #1f2937; /* text-gray-800 */
            background-color: #f9fafb; /* bg-gray-50 */
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .login-container .form-group input:focus {
            outline: none;
            border-color: #ef4444; /* red-500 */
            box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2); /* Wider, softer shadow */
        }
        .login-container .login-button {
            width: 100%;
            background-color: #dc2626; /* Red background */
            color: #fff;
            padding: 1.1rem 1.8rem; /* Larger padding */
            border-radius: 1rem; /* Very rounded */
            font-size: 1.2rem; /* Larger text */
            font-weight: 800; /* Extra bold */
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
            box-shadow: 0 6px 12px rgba(0,0,0,0.15); /* More pronounced shadow */
            margin-top: 2rem; /* More margin */
            letter-spacing: 0.025em; /* Slight letter spacing */
        }
        .login-container .login-button:hover {
            background-color: #b91c1c; /* Darker red */
            transform: translateY(-3px); /* More pronounced lift */
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .login-container .links-container {
            margin-top: 2rem; /* More spacing */
            font-size: 1rem; /* Slightly larger */
            color: #6b7280; /* text-gray-500 */
        }
        .login-container .links-container a {
            color: #dc2626; /* Red link color */
            text-decoration: none;
            font-weight: 700; /* Bold links */
            transition: color 0.2s ease, text-decoration 0.2s ease;
        }
        .login-container .links-container a:hover {
            color: #b91c1c; /* Darker red on hover */
            text-decoration: underline;
        }
        .login-container .separator {
            margin: 2rem 0; /* More spacing */
            position: relative;
            text-align: center;
        }
        .login-container .separator::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            border-top: 1px solid #e5e7eb; /* border-gray-200 */
            z-index: 0;
        }
        .login-container .separator span {
            background-color: #fff;
            padding: 0 15px; /* More padding */
            position: relative;
            z-index: 1;
            color: #9ca3af; /* text-gray-400 */
            font-size: 0.95rem; /* Slightly larger */
            font-weight: 500;
        }
        .login-container .social-login button {
            width: 100%;
            padding: 1rem 1.25rem; /* More padding */
            border: 1px solid #d1d5db;
            border-radius: 0.75rem; /* More rounded */
            font-size: 1.05rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px; /* More gap */
            background-color: #fff;
            color: #374151; /* text-gray-700 */
            cursor: pointer;
            transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.08); /* Subtle shadow */
        }
        .login-container .social-login button:hover {
            background-color: #f3f4f6; /* bg-gray-100 */
            border-color: #9ca3af;
            box-shadow: 0 4px 8px rgba(0,0,0,0.12);
        }
        .login-container .social-login .icon {
            font-size: 1.4rem; /* Larger icon */
        }


        /* Sidebar Styling */
        .sidebar {
            width: 300px; /* Slightly wider sidebar */
            background-color: #b91c1c; /* Darker red for sidebar base */
            color: #fff;
            padding: 40px 0; /* More padding top/bottom */
            display: flex;
            flex-direction: column;
            align-items: center;
            border-top-left-radius: 0.75rem;
            border-bottom-left-radius: 0.75rem;
            flex-shrink: 0;
            box-shadow: 4px 0 10px rgba(0,0,0,0.1); /* Shadow for sidebar */
        }
        .user-profile {
            text-align: center;
            margin-bottom: 50px; /* Increased margin */
            padding: 0 25px;
        }
        .profile-pic-container {
            width: 100px; /* Larger image */
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid #facc15; /* Yellow border for highlight */
            margin: 0 auto 15px; /* More spacing */
            box-shadow: 0 0 0 5px rgba(255,255,255,0.2); /* Outer glow effect */
        }
        .profile-pic {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .user-name {
            font-size: 1.5rem; /* Larger name */
            font-weight: 700; /* font-bold */
            margin-bottom: 6px;
        }
        .user-faculty {
            font-size: 1rem; /* Slightly larger faculty text */
            opacity: 0.9;
            font-weight: 400;
        }
        .navigation {
            width: 100%;
            flex-grow: 1;
        }
        .navigation ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .navigation li {
            width: 100%;
            margin-bottom: 8px; /* More spacing between items */
        }
        .navigation a {
            display: flex;
            align-items: center;
            padding: 16px 30px; /* More padding */
            color: #fff;
            text-decoration: none;
            font-size: 1.1rem; /* Slightly larger link text */
            font-weight: 500;
            transition: background-color 0.3s ease, padding-left 0.3s ease;
            position: relative;
        }
        .navigation a:hover {
            background-color: rgba(255, 255, 255, 0.2); /* More visible hover */
            padding-left: 35px; /* More pronounced indent */
        }
        .navigation a.active {
            background-color: #dc2626; /* Original red for active state */
            font-weight: 600;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.1); /* Inner shadow for active */
        }
        .navigation a.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 8px; /* Wider indicator */
            background-color: #facc15; /* Yellow indicator */
            border-top-right-radius: 9999px;
            border-bottom-right-radius: 9999px;
        }
        .navigation .icon {
            margin-right: 20px; /* More space for icon */
            font-size: 1.5rem; /* Larger icon */
            width: 28px; /* Fixed width to align icons */
            text-align: center;
        }


        /* Main Content Area */
        .main-content {
            flex-grow: 1;
            background-color: #fff;
            padding: 45px; /* More padding */
            border-top-right-radius: 0.75rem;
            border-bottom-right-radius: 0.75rem;
            display: flex;
            flex-direction: column;
        }
        .main-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 35px; /* Increased margin */
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 25px; /* More padding below line */
        }
        .main-header h2 {
            font-size: 2.2rem; /* Larger heading */
            font-weight: 800;
            color: #1f2937;
        }
        .header-controls {
            display: flex;
            gap: 20px; /* More space between controls */
            align-items: center;
        }
        .header-controls .red-button {
            background-color: #dc2626;
            color: #fff;
            padding: 12px 18px; /* Larger padding */
            border-radius: 0.6rem; /* More rounded */
            font-size: 1.5rem; /* Larger icon */
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header-controls .red-button:hover {
            background-color: #b91c1c;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        /* Dashboard Grid Layout */
        .dashboard-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 35px; /* Increased gap */
            flex-grow: 1;
        }
        .left-column, .right-column {
            display: flex;
            flex-direction: column;
            gap: 35px; /* Increased gap */
        }

        /* Noticeboard List */
        .noticeboard-list {
            background-color: #fff;
            border-radius: 0.85rem; /* More rounded */
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08); /* Stronger shadow */
            border: 1px solid #e5e7eb; /* Subtle border */
        }
        .notice-item {
            display: flex;
            align-items: flex-start;
            padding: 22px 28px; /* More padding */
            border-bottom: 1px solid #e5e7eb;
            gap: 24px; /* More space */
        }
        .notice-item:last-child {
            border-bottom: none;
        }
        .notice-icon {
            font-size: 2.5rem; /* Even larger icon */
            color: #dc2626;
            width: 64px; /* Larger fixed size */
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffe0e0; /* Lighter red-100 */
            border-radius: 0.85rem; /* More rounded */
            flex-shrink: 0;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* More shadow */
        }
        .notice-text {
            flex-grow: 1;
            text-align: left; /* Ensure text is left-aligned */
        }
        .notice-date {
            font-size: 0.85rem; /* Slightly larger text-xs */
            color: #6b7280;
            margin-bottom: 8px; /* More spacing */
            font-weight: 500;
        }
        .notice-title {
            font-size: 1.35rem; /* Larger title */
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px; /* More spacing */
            line-height: 1.4;
        }
        .notice-excerpt {
            font-size: 1rem; /* Larger excerpt */
            color: #4b5563; /* text-gray-600 */
            line-height: 1.6;
        }
        .notice-button {
            background-color: #fef2f2; /* Light red background for button */
            color: #dc2626;
            border: 2px solid #dc2626;
            padding: 12px 22px; /* More padding */
            border-radius: 9999px;
            font-size: 0.98rem; /* Slightly larger */
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            flex-shrink: 0;
            min-width: 140px; /* Wider button */
            text-align: center;
        }
        .notice-button:hover {
            background-color: #dc2626;
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .view-more-notices {
            background-color: #fff;
            color: #dc2626;
            border: 2px solid #dc2626;
            padding: 14px 28px; /* More padding */
            border-radius: 0.85rem; /* More rounded */
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            text-align: center;
            transition: all 0.3s ease;
            margin-top: 28px; /* More space */
            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
        }
        .view-more-notices:hover {
            background-color: #dc2626;
            color: #fff;
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        /* Bottom Widgets */
        .bottom-widgets {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px; /* Increased gap */
        }
        .widget {
            background-color: #fff;
            padding: 28px; /* More padding */
            border-radius: 0.85rem; /* More rounded */
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border: 1px solid #e5e7eb; /* Subtle border */
        }
        .widget h3 {
            font-size: 1.45rem; /* Larger heading */
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 20px; /* Increased margin */
        }
        .current-enrolment p {
            font-size: 1.25rem; /* Larger text */
            color: #4b5563;
            margin-bottom: 24px; /* Increased margin */
            flex-grow: 1;
        }
        .current-enrolment button {
            background-color: #dc2626;
            color: #fff;
            padding: 12px 24px;
            border-radius: 9999px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .current-enrolment button:hover {
            background-color: #b91c1c;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .assessment-status {
            text-align: left;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .assessment-status h3 {
            text-align: center;
        }
        .assessment-status .status-bar-wrapper {
            position: relative;
            margin-bottom: 20px; /* More spacing */
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding-bottom: 15px; /* More space for percentage */
        }
        .assessment-status .status-bar {
            width: 100%;
            background-color: #e5e7eb;
            height: 16px; /* Thicker bar */
            border-radius: 9999px;
            overflow: hidden;
        }
        .assessment-status .progress {
            background-color: #22c55e;
            height: 100%;
            border-radius: 9999px;
            transition: width 0.5s ease-in-out;
        }
        .assessment-status .percentage {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%) translateX(calc(100% - 70% - 10px)); /* Adjusted position */
            font-size: 0.95rem; /* Slightly larger */
            font-weight: 700;
            color: #1f2937;
            background-color: #dcfce7;
            padding: 3px 10px; /* More padding */
            border-radius: 9999px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .assessment-status .status-text {
            font-size: 1.15rem; /* Larger text */
            color: #4b5563;
            text-align: center;
            font-weight: 500;
        }

        /* Upcoming Activity */
        .upcoming-activity {
            background-color: #fff;
            padding: 28px; /* More padding */
            border-radius: 0.85rem; /* More rounded */
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            border: 1px solid #e5e7eb; /* Subtle border */
        }
        .upcoming-activity h3 {
            font-size: 1.45rem; /* Larger heading */
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 24px; /* More spacing */
        }
        .upcoming-
