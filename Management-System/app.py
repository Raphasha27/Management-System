import streamlit as st
import pandas as pd
import os
from streamlit_option_menu import option_menu

# Page Config
st.set_page_config(page_title="School Management System", layout="wide")

# File Paths
STUDENTS_FILE = "students.csv"
TEACHERS_FILE = "teachers.csv"

# Helper Functions to Load/Save Data
def load_data(file_path, columns):
    if not os.path.exists(file_path):
        return pd.DataFrame(columns=columns)
    return pd.read_csv(file_path)

def save_data(data, file_path):
    data.to_csv(file_path, index=False)

# Load Data
students_df = load_data(STUDENTS_FILE, ["ID", "Name", "Grade", "Age", "Guardian", "Contact"])
teachers_df = load_data(TEACHERS_FILE, ["ID", "Name", "Subject", "Phone", "Email"])

# Sidebar
with st.sidebar:
    selected = option_menu(
        "Menu",
        ["Dashboard", "Students", "Teachers"],
        icons=["house", "people", "person-badge"],
        menu_icon="cast",
        default_index=0,
    )

# Dashboard
if selected == "Dashboard":
    st.title("🏫 School Management System Dashboard")
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Total Students", len(students_df))
    with col2:
        st.metric("Total Teachers", len(teachers_df))

# Students Menu
elif selected == "Students":
    st.title("🎓 Student Management")
    
    with st.expander("➕ Register New Student"):
        with st.form("student_form"):
            s_id = st.text_input("Student ID")
            s_name = st.text_input("Full Name")
            s_grade = st.selectbox("Grade", ["8", "9", "10", "11", "12"])
            s_age = st.number_input("Age", min_value=5, max_value=25, step=1)
            s_guardian = st.text_input("Guardian Name")
            s_contact = st.text_input("Contact Number")
            
            submitted = st.form_submit_button("Register Student")
            if submitted:
                if s_id and s_name:
                    new_student = pd.DataFrame([{
                        "ID": s_id, "Name": s_name, "Grade": s_grade, 
                        "Age": s_age, "Guardian": s_guardian, "Contact": s_contact
                    }])
                    students_df = pd.concat([students_df, new_student], ignore_index=True)
                    save_data(students_df, STUDENTS_FILE)
                    st.success(f"Student {s_name} registered successfully!")
                    st.rerun()
                else:
                    st.error("Please fill in ID and Name.")

    st.subheader("Student List")
    st.dataframe(students_df, use_container_width=True)

# Teachers Menu
elif selected == "Teachers":
    st.title("🍎 Teacher Management")
    
    with st.expander("➕ Register New Teacher"):
        with st.form("teacher_form"):
            t_id = st.text_input("Teacher ID")
            t_name = st.text_input("Full Name")
            t_subject = st.text_input("Subject")
            t_phone = st.text_input("Phone")
            t_email = st.text_input("Email")
            
            submitted = st.form_submit_button("Register Teacher")
            if submitted:
                if t_id and t_name:
                    new_teacher = pd.DataFrame([{
                        "ID": t_id, "Name": t_name, "Subject": t_subject, 
                        "Phone": t_phone, "Email": t_email
                    }])
                    teachers_df = pd.concat([teachers_df, new_teacher], ignore_index=True)
                    save_data(teachers_df, TEACHERS_FILE)
                    st.success(f"Teacher {t_name} registered successfully!")
                    st.rerun()
                else:
                    st.error("Please fill in ID and Name.")

    st.subheader("Teacher List")
    st.dataframe(teachers_df, use_container_width=True)
