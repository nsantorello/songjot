scheduler = Rufus::Scheduler.start_new

scheduler.every("1m") do
   UpdateController.periodic_update
end