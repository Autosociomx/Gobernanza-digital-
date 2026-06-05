import React, { useState, useEffect } from 'react';
import { getDepartments, createDepartment, deleteDepartment, updateDepartment, Department } from '../services/departmentService';
import { Building2, Plus, Loader2, Trash2, Edit2, Save, X } from 'lucide-react';

export const DepartmentManager = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [newDept, setNewDept] = useState({ name: '', description: '', contact_email: '' });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDept, setEditDept] = useState({ name: '', description: '', contact_email: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDepartment(newDept);
      setNewDept({ name: '', description: '', contact_email: '' });
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateDepartment(id, editDept);
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (dept: Department) => {
    setEditingId(dept.id);
    setEditDept({ name: dept.name, description: dept.description, contact_email: dept.contact_email });
  };

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Building2 className="text-nayarit-orange" />
        Gestión de Dependencias y Soberanía Operativa
      </h2>
      
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input 
          placeholder="Denominación Oficial del Ente" 
          value={newDept.name} 
          onChange={e => setNewDept({...newDept, name: e.target.value})}
          className="p-3 border rounded-xl"
        />
        <input 
          placeholder="Misión Estratégica y Propósito Social" 
          value={newDept.description} 
          onChange={e => setNewDept({...newDept, description: e.target.value})}
          className="p-3 border rounded-xl"
        />
        <input 
          placeholder="Canal de Enlace Institucional" 
          value={newDept.contact_email} 
          onChange={e => setNewDept({...newDept, contact_email: e.target.value})}
          className="p-3 border rounded-xl"
        />
        <button className="bg-nayarit-orange text-white p-3 rounded-xl flex items-center justify-center gap-2 font-bold">
          <Plus size={20} /> Desplegar Infraestructura de Dependencia
        </button>
      </form>

      <div className="space-y-4">
        {departments.map(dept => (
          <div key={dept.id} className="p-4 border rounded-xl flex justify-between items-center">
            {editingId === dept.id ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full items-center">
                <input 
                  placeholder="Denominación Oficial del Ente"
                  value={editDept.name} 
                  onChange={e => setEditDept({...editDept, name: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <input 
                  placeholder="Misión Estratégica y Propósito Social"
                  value={editDept.description} 
                  onChange={e => setEditDept({...editDept, description: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <input 
                  placeholder="Canal de Enlace Institucional"
                  value={editDept.contact_email} 
                  onChange={e => setEditDept({...editDept, contact_email: e.target.value})}
                  className="p-2 border rounded-lg"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => handleUpdate(dept.id)} className="flex items-center gap-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-bold">
                    <Save size={16} /> Consolidar Cambios Estratégicos
                  </button>
                  <button onClick={() => setEditingId(null)} className="flex items-center gap-1 bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-bold">
                    <X size={16} /> Cancelar Operación
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="font-bold">{dept.name}</h3>
                  <p className="text-sm text-slate-500">{dept.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-slate-400">{dept.contact_email}</p>
                  <button onClick={() => startEdit(dept)} className="text-blue-600"><Edit2 size={20} /></button>
                  <button onClick={() => handleDelete(dept.id)} className="text-red-600"><Trash2 size={20} /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
