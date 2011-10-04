scheduler = Rufus::Scheduler.start_new

scheduler.every("10m") do
   UpdateController.periodic_update
end