scheduler = Rufus::Scheduler.start_new

scheduler.every("61m") do
   UpdateController.periodic_update
end