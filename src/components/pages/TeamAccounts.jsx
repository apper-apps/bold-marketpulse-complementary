import React, { useState, useEffect } from "react";
import TeamAccountCard from "@/components/molecules/TeamAccountCard";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import { toast } from "react-toastify";
import teamAccountService from "@/services/api/teamAccountService";

const TeamAccounts = () => {
  const [teamAccounts, setTeamAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Tags: "",
    team_members_c: "",
    associated_permissions_c: ""
  });

  const loadTeamAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamAccountService.getAll();
      setTeamAccounts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamAccounts();
  }, []);

  const filteredTeamAccounts = teamAccounts.filter(account =>
    account.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.Tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeamAccount = () => {
    setFormData({
      Name: "",
      Tags: "",
      team_members_c: "",
      associated_permissions_c: ""
    });
    setShowAddModal(true);
  };

  const handleEditTeamAccount = (account) => {
    setSelectedAccount(account);
    setFormData({
      Name: account.Name || "",
      Tags: account.Tags || "",
      team_members_c: account.team_members_c || "",
      associated_permissions_c: account.associated_permissions_c || ""
    });
    setShowEditModal(true);
  };

  const handleDeleteTeamAccount = async (accountId, accountName) => {
    if (window.confirm(`Are you sure you want to delete "${accountName}"? This action cannot be undone.`)) {
      try {
        await teamAccountService.delete(accountId);
        setTeamAccounts(prev => prev.filter(account => account.Id !== accountId));
        toast.success(`Team account "${accountName}" deleted successfully!`);
      } catch (error) {
        toast.error(`Failed to delete team account: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.Name.trim()) {
      toast.error("Team account name is required");
      return;
    }

    try {
      if (showEditModal && selectedAccount) {
        // Update existing team account
        const updatedAccount = await teamAccountService.update(selectedAccount.Id, formData);
        setTeamAccounts(prev => prev.map(account => 
          account.Id === selectedAccount.Id ? { ...account, ...updatedAccount } : account
        ));
        toast.success("Team account updated successfully!");
        setShowEditModal(false);
      } else {
        // Create new team account
        const newAccount = await teamAccountService.create(formData);
        setTeamAccounts(prev => [newAccount, ...prev]);
        toast.success("Team account created successfully!");
        setShowAddModal(false);
      }
      
      setSelectedAccount(null);
      setFormData({
        Name: "",
        Tags: "",
        team_members_c: "",
        associated_permissions_c: ""
      });
    } catch (error) {
      toast.error(`Failed to ${showEditModal ? 'update' : 'create'} team account: ${error.message}`);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedAccount(null);
    setFormData({
      Name: "",
      Tags: "",
      team_members_c: "",
      associated_permissions_c: ""
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTeamAccounts} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
            Team Accounts
          </h1>
          <p className="text-gray-600">
            Manage team accounts, members, and permissions
          </p>
        </div>
        <Button onClick={handleAddTeamAccount}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Team Account
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <ApperIcon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Search team accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {filteredTeamAccounts.length === 0 ? (
        searchTerm ? (
          <Empty 
            type="search" 
            message={`No team accounts found matching "${searchTerm}"`}
            onAction={() => setSearchTerm("")}
            actionLabel="Clear search"
          />
        ) : (
          <Empty 
            type="teamAccounts" 
            message="No team accounts found. Create your first team account to get started."
            onAction={handleAddTeamAccount}
            actionLabel="Add Team Account"
          />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeamAccounts.map((account) => (
            <TeamAccountCard
              key={account.Id}
              Name={account.Name}
              Tags={account.Tags}
              team_members_c={account.team_members_c}
              associated_permissions_c={account.associated_permissions_c}
              Owner={account.Owner}
              CreatedOn={account.CreatedOn}
              onEdit={() => handleEditTeamAccount(account)}
              onDelete={() => handleDeleteTeamAccount(account.Id, account.Name)}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    <ApperIcon name="Users" size={20} className="mr-2 inline" />
                    {showEditModal ? "Edit Team Account" : "Add New Team Account"}
                  </span>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ApperIcon name="X" size={20} />
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.Name}
                      onChange={(e) => setFormData(prev => ({ ...prev, Name: e.target.value }))}
                      placeholder="Enter team account name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <Input
                      type="text"
                      value={formData.Tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, Tags: e.target.value }))}
                      placeholder="Enter tags (comma separated)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Members
                    </label>
                    <Input
                      type="text"
                      value={formData.team_members_c}
                      onChange={(e) => setFormData(prev => ({ ...prev, team_members_c: e.target.value }))}
                      placeholder="Enter team member IDs or names"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Associated Permissions
                    </label>
                    <textarea
                      value={formData.associated_permissions_c}
                      onChange={(e) => setFormData(prev => ({ ...prev, associated_permissions_c: e.target.value }))}
                      placeholder="Enter permissions and access levels"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button type="submit" className="flex-1">
                      <ApperIcon name="Save" size={16} className="mr-2" />
                      {showEditModal ? "Update" : "Create"} Team Account
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAccounts;