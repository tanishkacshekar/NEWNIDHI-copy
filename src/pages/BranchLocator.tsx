import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Search } from 'lucide-react';
import { banks, Branch } from '../data/banks';
import { getCurrentLocation, calculateDistance, Location } from '../utils/geolocation';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const BranchLocator: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [nearbyBranches, setNearbyBranches] = useState<Array<Branch & { distance: number }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      updateNearbyBranches();
    }
  }, [userLocation, selectedBank, searchQuery]);

  const fetchUserLocation = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      setUserLocation(location);
    } catch (err) {
      setError('Could not access your location. Please enable location services.');
    } finally {
      setLoading(false);
    }
  };

  const updateNearbyBranches = () => {
    if (!userLocation) return;

    let filteredBranches = banks.flatMap(bank => 
      bank.branches.map(branch => ({
        ...branch,
        bankName: bank.name,
        bankId: bank.id,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          branch.location.lat,
          branch.location.lng
        )
      }))
    );

    // Filter by selected bank
    if (selectedBank !== 'all') {
      filteredBranches = filteredBranches.filter(branch => branch.bankId === selectedBank);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredBranches = filteredBranches.filter(branch => 
        branch.name.toLowerCase().includes(query) ||
        branch.address.toLowerCase().includes(query) ||
        branch.city.toLowerCase().includes(query)
      );
    }

    // Sort by distance
    filteredBranches.sort((a, b) => a.distance - b.distance);

    setNearbyBranches(filteredBranches);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Find Bank Branches Near You
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              Locate the nearest bank branch for your banking needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option value="all">All Banks</option>
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="col-span-2">
                  <div className="relative">
                    <Input
                      placeholder="Search by branch name, address, or city"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftIcon={<Search size={18} />}
                      fullWidth
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              {loading && (
                <div className="mt-4 text-center text-gray-600">
                  Loading nearby branches...
                </div>
              )}
            </div>

            {/* Branches List */}
            <div className="space-y-4">
              {nearbyBranches.map((branch) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-700 mb-2">
                        {branch.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{branch.bankName}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-primary-600 mr-2 mt-1" />
                          <p className="text-gray-700">
                            {branch.address}, {branch.city}, {branch.state} - {branch.pincode}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-primary-600 mr-2" />
                          <p className="text-gray-700">{branch.phone}</p>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-primary-600 mr-2" />
                          <p className="text-gray-700">{branch.workingHours}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-2xl font-semibold text-primary-700">
                        {branch.distance.toFixed(1)} km
                      </p>
                      <p className="text-sm text-gray-600">from your location</p>
                      
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${branch.location.lat},${branch.location.lng}`,
                            '_blank'
                          );
                        }}
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchLocator;