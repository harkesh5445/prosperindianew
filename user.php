<?php

require_once 'db.php';


$response = array();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  if (($_POST['action'] === 'getLogs')) {
    $response = getLogs();
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getLimitData')) {
    $response = getLimitData($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'addUser')) {
    $response = addUser($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getUsers')) {
    $response = getUsers($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'editUser')) {
    $response = getSingleUser($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'deleteUser')) {
    $response = deleteUser($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getPermission')) {
    $response = getPermission($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getAllPermissions')) {
    $response = getAllPermissions();
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getRoles')) {
    $response = getRoles();
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'updateUser')) {
    $response = updateUser($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'showAddUserModal')) {
    $response = showAddUserModal();
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'showEditRoleModal')) {
    $response = showEditRoleModal($_POST);
    echo json_encode($response);
    die();

  }


  if (($_POST['action'] === 'addRole')) {
    $response = addRole($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'editRole')) {
    $response = editRole($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'deleteRole')) {
    $response = deleteRole($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'showEditModal')) {
    $response = showEditModal($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'showAddModal')) {
    $response = showAddModal($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'editPermission')) {
    $response = editPermission($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'addPermission')) {
    $response = addPermission($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'deletePermission')) {
    $response = deletePermission($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getContacts')) {
    $response = getContacts($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'showDeletedUsers')) {
    $response = showDeletedUsers();
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getCount')) {
    $response = getCount();
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'deleteUserPermission')) {
    $response = deleteUserPermission($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'getTableCount')) {
    $response = getTableCount($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'reStoreUser')) {
    $response = reStoreUser($_POST);
    echo json_encode($response);
    die();

  }

  if (($_POST['action'] === 'changePass')) {
    $response = changePass($_POST);
    echo json_encode($response);
    die();

  }


}





function changePass($data)
{
 // print_r($data); die();
  global $db;
  global $con;
  if(!empty($data['password']) && !empty($data['confirm_password'])){
  if($data['password'] == $data['confirm_password']){
    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    $update = array(
        'password' => $data['password']
      );
      $db->update($con, USERS, $update,array('id'=>$data['id']));
      return array('status'=>true, 'message'=>'Password updated successfully. ');
  }else{
    return array('status'=>false, 'message'=>'Password does not match. ');
  }

  }else{
    return array('status'=>false, 'message'=>'Enter password and confirm password. ');
  }
  
}

function getLimitData($data)
{
  global $db;
  global $con;
  $sortKey = isset($_POST['sortKey'])?isset($_POST['sortKey']):'id';
  $sortOrder = $_POST['sortOrder'];
  $response = $db->getLimitData($con, LOGIN_LOGS, $data['start'], $data['end'],$sortKey,$sortOrder);
  if (!empty($response)) {
    return array('status' => true, 'data' => $response);
  } else {
    return array('status' => false);
  }
}


function deleteUserPermission($data)
{
  global $db;
  global $con;
  $ids = explode('-', $data['Ids']);
  $where = array('role_id' => $ids[0], 'permission_id' => $ids[1], 'user_id' => $data['userid']);
  $response = $db->update($con, USER_PERMISSIONS, array('status' => 0), $where);
  if (!empty($response)) {
    return array('status' => true);
  } else {
    return array('status' => false);
  }


}
function getTableCount($data)
{
  global $db;
  global $con;
  if (!empty($data['table']) && $data['table'] == 'Users') {
    $data = $db->fetch($con, USERS, array('isDeleted' => 0));
  }

  if (!empty($data['table']) && $data['table'] == 'Login_Logs') {
    $data = $db->fetch($con, LOGIN_LOGS);
  }

  if (!empty($data['table']) && $data['table'] == 'Contact_Us') {
    $data = $db->fetch($con, CONTACT_US);
  }

  $count = !empty($data) ? count($data) : 0;
  if (!empty($count)) {
    return array('status' => true, 'count' => $count);
  } else {
    return array('status' => false, 'message' => 'Count not fond. ');
  }

}

function getCount()
{
  global $db;
  global $con;

  $roles = $db->fetch($con, ROLES, array('isDeleted' => 0));
  $users = $db->fetch($con, USERS, array('isDeleted' => 0));
  $login_logs = $db->fetch($con, LOGIN_LOGS);
  $permissions = $db->fetch($con, PERMISSIONS, array('isDeleted' => 0));
  $contact_us = $db->fetch($con, CONTACT_US);

  $response['total_roles'] = !empty($roles) ? count($roles) : 0;
  $response['total_users'] = !empty($users) ? count($users) : 0;
  $response['total_logs'] = !empty($login_logs) ? count($login_logs) : 0;
  $response['total_permissions'] = !empty($permissions) ? count($permissions) : 0;
  $response['total_contacts'] = !empty($contact_us) ? count($contact_us) : 0;


  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Roles fond successfully. ');
  } else {
    return array('status' => false, 'message' => 'Roles not fond. ');
  }

}

function getRoles()
{
  global $db;
  global $con;

  $response = $db->fetch($con, ROLES);
  foreach ($response as $key => $val) {
    $user = $db->fetch($con, USERS, array('id' => $val['created_by']));
    $response[$key]['created_by'] = $user[0]['name'];
  }

  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Roles fond successfully. ');
  } else {
    return array('status' => false, 'message' => 'Roles not fond. ');
  }

}
function addRole($data)
{
  global $db;
  global $con;
  $response = $db->create($con, ROLES, array('name' => $data['role'], 'created_by' => $_SESSION['uid']));
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Role added successfully. ');
  } else {
    return array('status' => false, 'message' => 'Role not added. ');
  }

}

function showEditRoleModal($data)
{
  global $db;
  global $con;
  $response = $db->fetch($con, ROLES, array('id' => $data['id']));
  if (!empty($response)) {
    return array('status' => true, 'data' => $response[0], 'message' => 'Role updated successfully. ');
  } else {
    return array('status' => false, 'message' => 'Role not updated. ');
  }

}

function editRole($data)
{
  global $db;
  global $con;
  $response = $db->update($con, ROLES, array('name' => $data['role']), array('id' => $data['id']));
  if (!empty($response)) {
    return array('status' => true, 'message' => 'Role updated successfully. ');
  } else {
    return array('status' => false, 'message' => 'Role not updated. ');
  }

}

function deleteRole($data)
{
  global $db;
  global $con;
  $response = $db->delete($con, ROLES, array('id' => $data['id']));
  if (!empty($response)) {
    return array('status' => true, 'message' => 'Role Deleted successfully. ');
  } else {
    return array('status' => false, 'message' => 'Role not Deleted. ');
  }

}
function getAllPermissions()
{
  global $db;
  global $con;

  $response = $db->fetch($con, PERMISSIONS, array('isDeleted' => 0));
  foreach ($response as $key => $val) {
    $user = $db->fetch($con, USERS, array('id' => $val['created_by']));
    $role = $db->fetch($con, ROLES, array('id' => $val['role_id']));
    $response[$key]['created_by'] = $user[0]['name'];
    $response[$key]['role_id'] = $role[0]['name'];
  }

  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Permissions fond successfully. ');
  } else {
    return array('status' => false, 'message' => 'Permissions not fond. ');
  }

}

function showEditModal($data)
{
  global $db;
  global $con;
  $roles = $db->fetch($con, ROLES, array('isDeleted' => 0));
  $permissions = $db->fetch($con, PERMISSIONS, array('id' => $data['id']));
  $response['permissions'] = $permissions;
  $response['roles'] = $roles;
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Role found successfully. ');
  } else {
    return array('status' => false, 'message' => 'Role not found. ');
  }

}
function showAddModal($data)
{
  global $db;
  global $con;
  $roles = $db->fetch($con, ROLES, array('isDeleted' => 0));
  $response['roles'] = $roles;
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'data found successfully. ');
  } else {
    return array('status' => false, 'message' => 'data not found. ');
  }

}

function editPermission($data)
{
  global $db;
  global $con;
  $upArr = array('role_id' => $data['role_id'], 'name' => $data['permissions']);
  $where = array('id' => $data['prmsn_id'], 'isDeleted' => 0);
  $response = $db->update($con, PERMISSIONS, $upArr, $where);
  if (!empty($response)) {
    return array('status' => true, 'message' => 'Permission Updated successfully. ');
  } else {
    return array('status' => false, 'message' => 'Permission not updated. ');
  }

}

function addPermission($data)
{
  global $db;
  global $con;
  $upArr = array('created_by' => $_SESSION['uid'], 'role_id' => $data['role_id'], 'name' => $data['permissions']);
  $response = $db->create($con, PERMISSIONS, $upArr);
  if (!empty($response)) {
    return array('status' => true, 'message' => 'Permission added successfully. ');
  } else {
    return array('status' => false, 'message' => 'Permission not added. ');
  }

}

function deletePermission($data)
{
  global $db;
  global $con;
  $where = array('id' => $data['id']);
  $response = $db->delete($con, PERMISSIONS, $where);
  if (!empty($response)) {
    return array('status' => true, 'message' => 'Permission deleted successfully. ');
  } else {
    return array('status' => false, 'message' => 'Permission not deleted. ');
  }

}



function getContacts($data)
{
  global $db;
  global $con;
  $sortKey = !empty($_POST['sortKey'])?$_POST['sortKey']:'id';
  $sortOrder = $_POST['sortOrder'];
  $response = $db->getLimitData($con, CONTACT_US, $data['start'], $data['end'],$sortKey , $sortOrder);
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Contact fond successfully. ');
  } else {
    return array('status' => false, 'message' => 'Contact not fond. ');
  }

}

function getLogs()
{
  global $db;
  global $con;

  $response = $db->fetch($con, LOGIN_LOGS);
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Logs fond successfully. ');
  } else {
    return array('status' => false, 'message' => 'Logs not fond. ');
  }

}

function getUsers($data)
{
  global $db;
  global $con;
  $response = array();
  $sortKey = !empty($_POST['sortKey'])?$_POST['sortKey']:'id';
  $sortOrder = $_POST['sortOrder'];
 // print_r($data);
  if ($_SESSION['is_superadmin'] == 1) {
    
    $response = $db->getLimitData($con, USERS, $data['start'], $data['end'],$sortKey , $sortOrder, array('isDeleted' => 0));

  } else {

   $users = $db->getLimitData($con, USERS, $data['start'], $data['end'], $sortKey , $sortOrder, array('isDeleted' => 0, 'is_superadmin' => 0));
   if(!empty($users)){
    foreach ($users as $key => $value) {
      if ($_SESSION['userData']['email'] == $value['email']) {
        continue;
      }
      $response[] = $value;
    }
   }
 }


  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Users fetched successfully. ');
  } else {
    return array('status' => false, 'message' => 'Users not fond. ');
  }

}

function showDeletedUsers()
{
  global $db;
  global $con;

  $response = $db->fetch($con, USERS, array('isDeleted' => 1));
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Users fetched successfully. ');
  } else {
    return array('status' => false, 'message' => 'Users not fond. ');
  }

}

function getSingleUser($data)
{
  global $db;
  global $con;

  $roles = $db->fetch($con, ROLES);
  $rolesAr = array();
  foreach ($roles as $key => $value) {
    if (($value['name'] == 'SuperAdmin') && ($_SESSION['is_superadmin'] !== 1)) {
      continue;
    }
    $rolesAr[] = $value;
  }
  $response = $db->fetch($con, USERS, array('id' => $data['id']));

  if (empty($response)) {
    return array('status' => false, 'message' => 'User not found.');
  }

  $response = $response[0]; // Assuming only one user will be fetched

  $user_permissions = $db->fetch($con, USER_PERMISSIONS, array('user_id' => $response['id'], 'status' => 1));

  $userRoles = [];
  $userPermissions = [];

  foreach ($user_permissions as $key => $value) {
    $roldata = $db->fetch($con, ROLES, array('id' => $value['role_id']));
    $prmsndata = $db->fetch($con, PERMISSIONS, array('id' => $value['permission_id']));

    if (!empty($roldata)) {
      $roleName = $roldata[0]['name'];
      $userRoles[] = (int) $value['role_id'];

      if (!isset($userPermissions[$roleName])) {
        $userPermissions[$roleName] = [];
      }

      $userPermissions[$roleName][] = array(
        'id' => (int) $value['permission_id'],
        'role_id' => (int) $value['role_id'],
        'role' => $roleName,
        'permission' => $prmsndata[0]['name'] // Assuming 'permission' field exists in 'user_permissions' table
      );
    }
  }

  $response['roles'] = $rolesAr;
  $response['userRoles'] = array_values(array_unique($userRoles));
  $response['permissions'] = $userPermissions;

  return array('status' => true, 'data' => $response, 'message' => 'User fetched successfully.');
}

function showAddUserModal()
{
  global $db;
  global $con;
  $roles = $db->fetch($con, ROLES);
  if (!empty($roles)) {
    $response = array();
    foreach ($roles as $key => $value) {
      if (($value['name'] == 'SuperAdmin') && ($_SESSION['is_superadmin'] !== 1)) {
        continue;
      }
      $response[] = $value;
    }

    return array('status' => true, 'data' => $response, 'message' => 'Data fetched successfully. ');
  } else {
    return array('status' => true, 'data' => [], 'message' => 'Data not fond. ');
  }

}
function getPermission($data)
{
  global $db;
  global $con;
  $response = $db->fetch($con, PERMISSIONS, array('role_id' => $data['role_id']));
  if (!empty($response)) {
    return array('status' => true, 'data' => $response, 'message' => 'Data fetched successfully. ');
  } else {
    return array('status' => false, 'message' => 'Data not fond. ');
  }

}



function addUser($data)
{
  global $db;
  global $con;
  //print_r($data);die;
  $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
  $check = $db->exist($con, $data['email'], USERS);
  if (!$check) {

    $insertArr = array(
      'name' => $data['name'],
      'email' => $data['email'],
      'phone' => $data['phone'],
      'password' => $data['password'],
      'is_verified' => 1
    );
    $result = $db->create($con, USERS, $insertArr);
    if ($result) {
      if (!empty($data['permissions'])) {
        $permissions = $data['permissions'];
        foreach ($permissions as $key => $value) {
          $arr = explode('-', $value);
          $insert = array('user_id' => $result, 'permission_id' => $arr[1], 'role_id' => $arr[0]);
          $db->create($con, USER_PERMISSIONS, $insert);
        }
      }

      return array('status' => true, 'uid' => $result, 'message' => 'User added successfully. ');
    } else {
      return array('status' => false, 'message' => 'User not added.');
    }
  } else {
    return array('status' => false, 'message' => 'User already exist.');
  }
}


function updateUser($data)
{

  global $db, $con;

  if (!empty($data) && isset($data['id'])) {
    $id = $data['id'];
    $update = array();
    $user = $db->fetch($con, USERS, array('id' => $data['id']));
    if ((int) $user[0]['is_verified'] != 1) {
      if (isset($data['is_verified']) && ($data['is_verified'] == 'on')) {
        $update['is_verified'] = 1;
      } else {
        $update['is_verified'] = 0;
      }
    }
    if (isset($data['isDeleted']) && $data['isDeleted'] == 'on') {
      $update['isDeleted'] = 1;
    } else {
      $update['isDeleted'] = 0;
    }

    if (isset($data['name'])) {
      $update['name'] = $data['name'];
    }
    if (isset($data['email'])) {
      $update['email'] = $data['email'];
    }
    if (isset($data['phone'])) {
      $update['phone'] = $data['phone'];
    }

    $update['updated_at'] = date("Y-m-d H:i:s");
    //print_r($update);
    //die;
    $result = $db->update($con, USERS, $update, array('id' => $id));
    if ($result) {
      if (!empty($data['permissions'])) {
        $permissions = $data['permissions'];
        foreach ($permissions as $key => $value) {
          $arr = explode('-', $value);
          $insert = array('user_id' => $id, 'permission_id' => $arr[1], 'role_id' => $arr[0]);
          $res = $db->fetch($con, USER_PERMISSIONS, $insert);
          if (!empty($res)) {
            $res = $db->update($con, USER_PERMISSIONS, array('status' => 1), $insert);
          } else {
            $db->create($con, USER_PERMISSIONS, $insert);
          }

        }
      }
      return array('status' => true, 'message' => 'User updated successfully.');
    } else {
      return array('status' => false, 'message' => 'User not updated.');
    }
  } else {
    return array('status' => false, 'message' => 'Invalid data or user ID.');
  }
}

function deleteUser($data)
{
  global $db;
  global $con;
  $where['id'] = $data['id'];
  $result = $db->update($con, USERS, array('isDeleted' => 1, 'is_verified' => 0), $where);
  if ($result) {
    return array('status' => true, 'message' => 'User deleted successfully. ');
  } else {
    return array('status' => false, 'message' => 'User not deleted.');
  }
}

function reStoreUser($data)
{
  global $db;
  global $con;
  $where['id'] = $data['id'];
  $result = $db->update($con, USERS, array('isDeleted' => 0, 'is_verified' => 1), $where);
  if ($result) {
    return array('status' => true, 'message' => 'User restored successfully. ');
  } else {
    return array('status' => false, 'message' => 'User not restored.');
  }
}

function validateEmail($email)
{
  $regex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';
  if (preg_match($regex, $email)) {
    return true;
  } else {
    return false;
  }
}



function validatePhone($phone)
{
  $phone = preg_replace('/[\s\-\(\)]+/', '', $phone);
  if (preg_match('/^\d{10}$/', $phone)) {
    return true;
  } else {
    return false;
  }
}