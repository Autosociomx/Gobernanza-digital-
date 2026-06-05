import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  query, 
  orderBy,
  limit,
  setDoc
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';

export interface Department {
  id: string;
  name: string;
  description: string;
  contact_email: string;
  updatedAt?: any;
}

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  userId: string;
  userEmail: string;
  targetId: string;
  targetType: string;
  timestamp: any;
  details: any;
}

const DEPARTMENTS_COLLECTION = 'departments';
const AUDIT_LOGS_COLLECTION = 'audit_logs';

export const getAuditLogs = async (limitCount: number = 50): Promise<AuditLog[]> => {
  try {
    const q = query(
      collection(db, AUDIT_LOGS_COLLECTION), 
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AuditLog));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, AUDIT_LOGS_COLLECTION);
    return [];
  }
};

const logAction = async (action: 'CREATE' | 'UPDATE' | 'DELETE', targetId: string, details: any) => {
  if (!auth.currentUser) return;
  
  const logData = {
    action,
    userId: auth.currentUser.uid,
    userEmail: auth.currentUser.email,
    targetId,
    targetType: 'Department',
    timestamp: serverTimestamp(),
    details
  };

  try {
    await addDoc(collection(db, AUDIT_LOGS_COLLECTION), logData);
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // We don't throw here to avoid blocking the main action, 
    // but in a production system we might want more robust logging.
  }
};

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const q = query(collection(db, DEPARTMENTS_COLLECTION), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Department));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, DEPARTMENTS_COLLECTION);
    return [];
  }
};

export const createDepartment = async (department: Omit<Department, 'id'>): Promise<Department> => {
  try {
    const data = {
      ...department,
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, DEPARTMENTS_COLLECTION), data);
    await logAction('CREATE', docRef.id, department);
    return { id: docRef.id, ...data };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, DEPARTMENTS_COLLECTION);
    throw error;
  }
};

export const deleteDepartment = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, DEPARTMENTS_COLLECTION, id);
    await deleteDoc(docRef);
    await logAction('DELETE', id, { id });
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${DEPARTMENTS_COLLECTION}/${id}`);
    throw error;
  }
};

export const updateDepartment = async (id: string, department: Omit<Department, 'id'>): Promise<void> => {
  try {
    const docRef = doc(db, DEPARTMENTS_COLLECTION, id);
    const data = {
      ...department,
      updatedAt: serverTimestamp()
    };
    await updateDoc(docRef, data);
    await logAction('UPDATE', id, department);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${DEPARTMENTS_COLLECTION}/${id}`);
    throw error;
  }
};
