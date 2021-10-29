<%@ page contentType='text/html;charset=UTF-8' language='java' %>
<html>
    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=windows-1256'>
        <title>Admin Page</title>
        <meta name='viewport' content='initial-scale=1, width=device-width'>
        <link rel='stylesheet' href='${pageContext.request.contextPath}/css/adminArea.css' type='text/css'>
        <%@include file='header.jsp'%>
    </head>
    <body class='admin-body'>
        <!--header-->
        <br>
        <div id='left'>
            <div id='mobileAdminButtonContainer'>
                <button id='mobileAdminButton'>
                    <i class='fa fa-arrow-right' id='AdminIcon'></i>
                </button>
            </div>
            <div id='adminPage' class='left-box'>
                <h1 class='admin-header'>Admin Area</h1>
                <ul id='left-box-list'>
                    <li class='left-box-item'>
                        <button id='studente' class='admin-button current'>
                            <i class='fa fa-graduation-cap'></i>Manage students
                        </button>
                    </li>
                    <li class='left-box-item'>
                        <button id='corso' class='admin-button'>
                            <i class='fa fa-book'></i>Manage courses
                        </button>
                    </li>
                    <li class='left-box-item'>
                        <button id='categoria' class='admin-button'>
                            <i class='fa fa-list-ul'></i>Manage categories
                        </button>
                    </li>
                    <li class='left-box-item'>
                        <button id='insegnante' class='admin-button'>
                            <i class='fa fa-users'></i>Manage teachers
                        </button>
                    </li>
                    <li class='left-box-item'>
                        <button id='admin' class='admin-button'><i class='fa fa-briefcase'></i>Manage admin</button>
                    </li>
                </ul>
            </div>
        </div>

        <div id='studente-div'>
            <h1 class='manage-header-student'>Manage users</h1>
            <div class='admin-fieldset'>
                <h3>Remove user</h3>
                <div class="searchBarStudentAdmin searchBarAdminContainer" id="searchBarContainerStudentAdmin">
                    <form action="search-students-admin">
                        <input type="text" placeholder="Search.." name="search" required oninvalid="this.setCustomValidity('Inserisci qualcosa da cercare!')" oninput="this.setCustomValidity('')" >
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="table-div students-table-div">
                    <table border='1' id='students-table' class='content-table'>
                        <thead>
                        <tr class='students-table-header'>
                            <th>Username</th>
                            <th>Mail</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>CF</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody class='students-table-body'>
                        <c:forEach items='${firstStudents}' var='student'>
                            <tr id="${student.username}UserRow" class='students-table-body-row'>
                                <td>  ${student.username}  </td>
                                <td>  ${student.mail}  </td>
                                <td>  ${student.name}  </td>
                                <td>  ${student.surname}  </td>
                                <td>  ${student.CF}  </td>
                                <td class='form-container'>
                                    <form name='removeStudentForm' class='removeStudentForm' method='post' action='removeUser-servlet'>
                                        <input type='hidden' value='${student.username}' name='removeUser' class="usernameForRemove">
                                        <input type='submit' value='✗' class='removeStudentAdminButton'>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div class='paginationStudents'>
                    <span id='previousPageStudents' class='visible'>&laquo;</span>
                    <span id='ellipseSxStudents'>...</span>
                    <c:set var='maxPageStudents' value='${Math.ceil(studentsLength/4)}'/>
                    <c:forEach var='i' begin='1' end='${maxPageStudents}'>
                        <c:if test='${i == 1}'>
                            <span class='current visible pageNumBtnStudentAdmin' id='pageStudents${i}'>${i}</span>
                        </c:if>
                        <c:if test='${i != 1}'>
                            <c:if test='${i <= 4}'>
                                <span class='pageNumBtnStudentAdmin visible' id='pageStudents${i}'>${i}</span>
                            </c:if>
                            <c:if test='${i > 4}'>
                                <span class='pageNumBtnStudentAdmin' id='pageStudents${i}'>${i}</span>
                            </c:if>
                        </c:if>
                    </c:forEach>
                    <c:if test='${maxPageStudents > 4}'>
                        <span id='ellipseDxStudents' class='visible'>...</span>
                    </c:if>
                    <c:if test='${maxPageStudents <= 4}'>
                        <span id='ellipseDxStudents'>...</span>
                    </c:if>
                    <span id='nextPageStudents' class='visible'>&raquo;</span>
                </div>
            </div>
        </div>

        <div id='corso-div' style='display: none'>
            <h1 class='manage-header-course'>Manage courses</h1>
            <div class='admin-fieldset'>
                <h3>Add new course</h3>
                <form id='addCourseForm' name='addCourseForm' action='addCourse-servlet' method='post' enctype='multipart/form-data'>
                    <div class='admin-textbox'>
                        <input type='text' id='courseName' name='courseName' placeholder='Name'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input type='text' id='category' name='category' placeholder='Category'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input type='number' id='year' name='year' placeholder='Year'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input class='dateInput' type='text' name='startDate' id='startDate' placeholder='Start Date'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input class='dateInput' type='text' name='endDate' id='endDate' placeholder='End Date'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input type='text' id='price' name='price' placeholder='Price'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input type='text' id='teacher' name='teacher' placeholder='Teacher Username'><br>
                    </div>
                    <div class='admin-textbox'>
                        <label>Course image</label>
                        <input type='file' id='course-image' name='course-image'><br>
                    </div>
                    <div class='admin-textbox'>
                        <label>Course certificate</label>
                        <input type='file' id='course-certificate' name='certificate'><br>
                    </div>
                    <div class='admin-textbox-textarea'>
                        <textarea id='description' placeholder="Description" name='description'></textarea><br>
                    </div>
                    <div class='admin-textbox' style='border: none'>
                        <span id='errorMessageAddCourse' class='Error'></span><br>
                    </div>
                    <div id='submitAdminButtonContainerAddCourse'>
                        <input class='btnAdmin submitBtn' type='submit' disabled>
                    </div>
                </form>
            </div>
            <div class='admin-fieldset'>
                <h3>Delete/Update course</h3>
                <div class="searchBarCourseAdmin searchBarAdminContainer" id="searchBarContainerCourseAdmin">
                    <form action="search-courses-admin">
                        <input type="text" placeholder="Search.." name="search" required oninvalid="this.setCustomValidity('Inserisci qualcosa da cercare!')" oninput="this.setCustomValidity('')" >
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="table-div courses-table-div">
                    <table border='1' id='courses-table' class='content-table'>
                        <thead>
                        <tr class='courses-table-header'>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Year</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Price</th>
                            <th># enrolled</th>
                            <th>Teacher username</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Certificate</th>
                            <th>Change</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody class='courses-table-body'>
                        <c:forEach items='${firstCourses}' var='course'>
                            <tr id="${course.name}CourseRow" class='courses-table-body-row'>
                                <td class='can-be-editable editable-name'>  ${course.name}  </td>
                                <td class='can-be-editable editable-category'>  ${course.category}  </td>
                                <td class='can-be-editable editable-year'>  ${course.year}  </td>
                                <td class='can-be-editable editable-startDate'>  ${course.startDate}  </td>
                                <td class='can-be-editable editable-endDate'>  ${course.endDate}  </td>
                                <td class='can-be-editable editable-price'>  ${course.price}  </td>
                                <td class='numEnrolled'>  ${course.numEnrolled}  </td>
                                <td class='can-be-editable editable-teacherUsername'>  ${course.teacher.username}  </td>
                                <td class='can-be-editable editable-description'> ${course.description} </td>
                                <td class='can-be-editable editable-imagePath'>
                                    <input type='file' name='fileCourse' style='display: none'>
                                    <span>${course.imagePath}</span>
                                </td>
                                <td class="can-be-editable editable-certificate">
                                    <input type='file' name='certificateCourse' style='display: none'>
                                    <span>${course.certificate}</span>
                                </td>
                                <td class='form-container'>
                                    <form class='changeCourseForm' name='changeCourseForm' method='post' action='changeCourse'>
                                        <input type='hidden' value='${course.name}' name='changeCourse' class='changeCourseOldName'>
                                        <input type='submit' value='📝' class='changeCourseAdminButton'>
                                        <span class="errorCourseMessage" style="color: #c75450; display: none"></span>
                                    </form>
                                </td>
                                <td class='form-container'>
                                    <form name='removeCourseForm' class='removeCourseForm' method='post' action='removeCourse-servlet'>
                                        <input type='hidden' value='${course.name}' name='removeCourse' class="removeCourseOldName">
                                        <input type='submit' value='✗' class='removeCourseAdminButton'>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div class='paginationCourses'>
                    <span id='previousPageCourses' class='visible'>&laquo;</span>
                    <span id='ellipseSxCourses'>...</span>
                    <c:set var='maxPageCourses' value='${Math.ceil(coursesLength/4)}'/>
                    <c:forEach var='i' begin='1' end='${maxPageCourses}'>
                        <c:if test='${i == 1}'>
                            <span class='current visible pageNumBtnCourseAdmin' id='pageCourses${i}'>${i}</span>
                        </c:if>
                        <c:if test='${i != 1}'>
                            <c:if test='${i <= 4}'>
                                <span class='pageNumBtnCourseAdmin visible' id='pageCourses${i}'>${i}</span>
                            </c:if>
                            <c:if test='${i > 4}'>
                                <span class='pageNumBtnCourseAdmin' id='pageCourses${i}'>${i}</span>
                            </c:if>
                        </c:if>
                    </c:forEach>
                    <c:if test='${maxPageCourses > 4}'>
                        <span id='ellipseDxCourses' class='visible'>...</span>
                    </c:if>
                    <c:if test='${maxPageCourses <= 4}'>
                        <span id='ellipseDxCourses'>...</span>
                    </c:if>
                    <span id='nextPageCourses' class='visible'>&raquo;</span>
                </div>
            </div>
        </div>

        <div id='categoria-div' style='display: none'>
            <h1 class='manage-header-category'>Manage categories</h1>
            <div class='admin-fieldset'>
                <h3>Add category</h3>
                <form id='addCategoryForm' name='addCategoryForm' action='addCategory-servlet' method='post' enctype='multipart/form-data'>
                    <div class='admin-textbox'>
                        <input type='text' id='categoryName' class='admin-textbox' name='categoryName' placeholder='Category name'><br>
                    </div>
                    <div class='admin-textbox'>
                        <input type='file' id='image_path' name='image_path'>
                    </div>
                    <div class='admin-textbox-textarea'>
                        <textarea id='description_category' placeholder="Description" name='description_category'></textarea>
                    </div>
                    <div class='admin-textbox' style='border: none'>
                        <span id='errorMessageAddCategory' class='Error'></span><br>
                    </div>
                    <div id='submitAdminButtonContainerAddCategory'>
                        <input type='submit' class='btnAdmin submitBtn' disabled>
                    </div>
                </form>
            </div>
            <div class='admin-fieldset'>
                <h3>Delete category</h3>
                <div class="searchBarCategoryAdmin searchBarAdminContainer" id="searchBarContainerCategoryAdmin">
                    <form action="search-categories-admin">
                        <input type="text" placeholder="Search.." name="search" required oninvalid="this.setCustomValidity('Inserisci qualcosa da cercare!')" oninput="this.setCustomValidity('')" >
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="table-div categories-table-div">
                    <table border='1' id='categories-table' class='content-table'>
                        <thead>
                        <tr class='categories-table-header'>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image Path</th>
                            <th>Change</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody class='categories-table-body'>
                        <c:forEach items='${firstCategories}' var='category'>
                            <tr id="${category.name}CategoryRow" class='categories-table-body-row'>
                                <td class='can-be-editable editable-name'>  ${category.name}  </td>
                                <td class='can-be-editable editable-description'>  ${category.description}  </td>
                                <td class='can-be-editable editable-imagePath'>
                                    <input type='file' name='fileCategory' style='display: none'>
                                    <span>${category.imagePath}</span>
                                </td>
                                <td class='form-container'>
                                    <form class='changeCategoryForm' name='changeCategoryForm' method='post' action='changeCategory'>
                                        <input type='hidden' value='${category.name}' name='changeCategory' class='changeCategoryOldName'>
                                        <input type='submit' value='📝' class='changeCategoryAdminButton'>
                                        <span class="errorCategoryMessage" style="color: #c75450; display: none"></span>
                                    </form>
                                </td>
                                <td class='form-container'>
                                    <form class='removeCategoryForm' name='removeCategoryForm' method='post' action='removeCategory'>
                                        <input type='hidden' value='${category.name}' name='removeCategory' class='removeCategoryOldName'>
                                        <input type='submit' value='✗' class='removeCategoryAdminButton'>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div class='paginationCategories'>
                    <span id='previousPageCategories' class='visible'>&laquo;</span>
                    <span id='ellipseSxCategories'>...</span>
                    <c:set var='maxPageCategories' value='${Math.ceil(categoriesLength/4)}'/>
                    <c:forEach var='i' begin='1' end='${maxPageCategories}'>
                        <c:if test='${i == 1}'>
                            <span class='current visible pageNumBtnCategoryAdmin' id='pageCategories${i}'>${i}</span>
                        </c:if>
                        <c:if test='${i != 1}'>
                            <c:if test='${i <= 4}'>
                                <span class='pageNumBtnCategoryAdmin visible' id='pageCategories${i}'>${i}</span>
                            </c:if>
                            <c:if test='${i > 4}'>
                                <span class='pageNumBtnCategoryAdmin' id='pageCategories${i}'>${i}</span>
                            </c:if>
                        </c:if>
                    </c:forEach>
                    <c:if test='${maxPageCategories > 4}'>
                        <span id='ellipseDxCategories' class='visible'>...</span>
                    </c:if>
                    <c:if test='${maxPageCategories <= 4}'>
                        <span id='ellipseDxCategories'>...</span>
                    </c:if>
                    <span id='nextPageCategories' class='visible'>&raquo;</span>
                </div>
            </div>
        </div>

        <div id='insegnante-div' style='display: none'>
            <h1 class='manage-header-teacher'>Manage teachers</h1>
            <div class='admin-fieldset'>
                <h3>Add teacher</h3>
                <form id='addTeacherForm' name='addTeacherForm' action='addTeacher-servlet' method='post'>
                    <div class='admin-textbox'>
                        <input type='text' id='userName' class='admin-textbox' name='userName' placeholder='Username'><br>
                    </div>
                    <div class='admin-textbox-textarea'>
                        <textarea id='curriculum' placeholder="Curriculum" name='curriculum'></textarea><br>
                    </div>
                    <div class='admin-textbox' style='border: none'>
                        <span id='errorMessageAddTeacher' class='Error'></span><br>
                    </div>
                    <div id='submitAdminButtonContainerAddTeacher'>
                        <input type='submit' class='btnAdmin submitBtn' disabled>
                    </div>
                </form>
            </div>
            <div class='admin-fieldset'>
                <h3>All teachers</h3>
                <div class="searchBarTeacherAdmin searchBarAdminContainer" id="searchBarContainerTeacherAdmin">
                    <form action="search-teachers-admin">
                        <input type="text" placeholder="Search.." name="search" required oninvalid="this.setCustomValidity('Inserisci qualcosa da cercare!')" oninput="this.setCustomValidity('')" >
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="table-div teachers-table-div">
                    <table border='1' id='teachers-table' class='content-table'>
                        <thead>
                        <tr class='teachers-table-header'>
                            <th>Username</th>
                            <th>Curriculum</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody class='teachers-table-body'>
                        <c:forEach items='${firstTeachers}' var='teach'>
                            <tr id="${teach.username}TeacherRow" class='teachers-table-body-row'>
                                <td>  ${teach.username}  </td>
                                <td>  ${teach.curriculum}</td>
                                <td class='form-container'>
                                    <form name='removeTeacherForm' class='removeTeacherForm' method='post' action='removeTeacher-servlet'>
                                        <input type='hidden' value='${teach.username}' name='removeTeacher' class='teacherNameForRemove'>
                                        <input type='submit' value='✗' class='removeTeacherAdminButton'>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div class='paginationTeachers'>
                    <span id='previousPageTeachers' class='visible'>&laquo;</span>
                    <span id='ellipseSxTeachers'>...</span>
                    <c:set var='maxPageTeachers' value='${Math.ceil(teachersLength/4)}'/>
                    <c:forEach var='i' begin='1' end='${maxPageTeachers}'>
                        <c:if test='${i == 1}'>
                            <span class='current visible pageNumBtnTeacherAdmin' id='pageTeachers${i}'>${i}</span>
                        </c:if>
                        <c:if test='${i != 1}'>
                            <c:if test='${i <= 4}'>
                                <span class='pageNumBtnTeacherAdmin visible' id='pageTeachers${i}'>${i}</span>
                            </c:if>
                            <c:if test='${i > 4}'>
                                <span class='pageNumBtnTeacherAdmin' id='pageTeachers${i}'>${i}</span>
                            </c:if>
                        </c:if>
                    </c:forEach>
                    <c:if test='${maxPageTeachers > 4}'>
                        <span id='ellipseDxTeachers' class='visible'>...</span>
                    </c:if>
                    <c:if test='${maxPageTeachers <= 4}'>
                        <span id='ellipseDxTeachers'>...</span>
                    </c:if>
                    <span id='nextPageTeachers' class='visible'>&raquo;</span>
                </div>
            </div>
        </div>

        <div id='admin-div' style='display: none'>
            <h1 class='manage-header-admin'>Manage admin</h1>
            <div class='admin-fieldset'>
                <h3>Add admin</h3>
                <form id='addAdminForm' name='addAdminForm' action='addAdmin-servlet' method='post'>
                    <div class='admin-textbox'>
                        <input type='text' id='addAdmin' class='admin-textbox' name='addAdmin' placeholder='Username'><br>
                    </div>
                    <div class='admin-textbox' style='border: none'>
                        <span id='errorMessageAddAdmin' class='Error'></span><br>
                    </div>
                    <div id='submitAdminButtonContainerAddAdmin'>
                        <input type='submit' class='btnAdmin submitBtn' disabled>
                    </div>
                </form>
            </div>
            <div class='admin-fieldset'>
                <h3>Delete admin</h3>
                <div class="searchBarAdminAdmin searchBarAdminContainer" id="searchBarContainerAdminAdmin">
                    <form action="search-admins-admin">
                        <input type="text" placeholder="Search.." name="search" required oninvalid="this.setCustomValidity('Inserisci qualcosa da cercare!')" oninput="this.setCustomValidity('')" >
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </form>
                </div>
                <div class="table-div admin-table-div">
                    <table border='1' id='admins-table' class='content-table'>
                        <thead>
                        <tr class='admins-table-header'>
                            <th>Username</th>
                            <th>Mail</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>CF</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody class='admins-table-body'>
                        <c:forEach items='${firstAdmins}' var='admin'>
                            <tr id="${admin.username}AdminRow" class='admins-table-body-row'>
                                <td>  ${admin.username}  </td>
                                <td>  ${admin.mail}  </td>
                                <td>  ${admin.name}  </td>
                                <td>  ${admin.surname}  </td>
                                <td>  ${admin.CF}  </td>
                                <td class='form-container'>
                                    <form name='removeAdminForm' class='removeAdminForm' method='post' action='removeAdmin-servlet'>
                                        <input type='hidden' value='${admin.username}' name='removeAdmin' class='adminNameForRemove'>
                                        <input type='submit' value='✗' class='removeAdminAdminButton'>
                                    </form>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div class='paginationAdmins'>
                    <span id='previousPageAdmins' class='visible'>&laquo;</span>
                    <span id='ellipseSxAdmins'>...</span>
                    <c:set var='maxPageAdmins' value='${Math.ceil(adminsLength/4)}'/>
                    <c:forEach var='i' begin='1' end='${maxPageAdmins}'>
                        <c:if test='${i == 1}'>
                            <span class='current visible pageNumBtnAdminAdmin' id='pageAdmins${i}'>${i}</span>
                        </c:if>
                        <c:if test='${i != 1}'>
                            <c:if test='${i <= 4}'>
                                <span class='pageNumBtnAdminAdmin visible' id='pageAdmins${i}'>${i}</span>
                            </c:if>
                            <c:if test='${i > 4}'>
                                <span class='pageNumBtnAdminAdmin' id='pageAdmins${i}'>${i}</span>
                            </c:if>
                        </c:if>
                    </c:forEach>
                    <c:if test='${maxPageAdmins > 4}'>
                        <span id='ellipseDxAdmins' class='visible'>...</span>
                    </c:if>
                    <c:if test='${maxPageAdmins <= 4}'>
                        <span id='ellipseDxAdmins'>...</span>
                    </c:if>
                    <span id='nextPageAdmins' class='visible'>&raquo;</span>
                </div>
            </div>
        </div>
        <script>var maxPageStudents = ${(maxPageStudents > 0)?(maxPageStudents):(1)}; //mantiena l'indice dell'ultima pagina</script>
        <script>var maxPageCourses = ${(maxPageCourses > 0)?(maxPageCourses):(1)}; //mantiena l'indice dell'ultima pagina</script>
        <script>var maxPageCategories = ${(maxPageCategories > 0)?(maxPageCategories):(1)}; //mantiena l'indice dell'ultima pagina</script>
        <script>var maxPageTeachers = ${(maxPageTeachers > 0)?(maxPageTeachers):(1)}; //mantiena l'indice dell'ultima pagina</script>
        <script>var maxPageAdmins = ${(maxPageAdmins > 0)?(maxPageAdmins):(1)}; //mantiena l'indice dell'ultima pagina</script>
        <script src='${pageContext.request.contextPath}/js/studentsAdmin.js'></script>
        <script src='${pageContext.request.contextPath}/js/adminsAdmin.js'></script>
        <script src='${pageContext.request.contextPath}/js/coursesAdmin.js'></script>
        <script src='${pageContext.request.contextPath}/js/categoriesAdmin.js'></script>
        <script src='${pageContext.request.contextPath}/js/teachersAdmin.js'></script>
        <script src='${pageContext.request.contextPath}/js/formAdminValidation.js'></script>
        <script src='${pageContext.request.contextPath}/js/adminForm.js'></script>
        <script src='${pageContext.request.contextPath}/js/utility.js' ></script>
        <script src='${pageContext.request.contextPath}/js/adminArea.js'></script>
        <script src='${pageContext.request.contextPath}/js/mobileAdminMenu.js' ></script>
    </body>
</html>
