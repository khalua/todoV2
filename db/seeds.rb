User.delete_all
Task.delete_all
Priority.delete_all

u1 = User.create(:name => 'bob', :email => 'bob@gmail.com', :password => 'a', :password_confirmation => 'a')
u2 = User.create(:name => 'sue', :email => 'sue@gmail.com', :password => 'a', :password_confirmation => 'a')
u3 = User.create(:name => 'sam', :email => 'sam@gmail.com', :password => 'a', :password_confirmation => 'a')

p1 = Priority.create(:name => 'p900', :color => '#ff0000', :value => 900)
p2 = Priority.create(:name => 'p800', :color => '#00ff00', :value => 800)
p3 = Priority.create(:name => 'p750', :color => '#0000ff', :value => 750)
p4 = Priority.create(:name => 'p690', :color => '#ff33cc', :value => 690)
p5 = Priority.create(:name => 'p775', :color => '#ff90ff', :value => 775)

t1 = Task.create(:address => '500 Broadway, NYC', :title => 'Get milk', :description => 'Need milk now', :duedate => '3/3/2010', :is_complete => true)
t2 = Task.create(:address => '310 Greenwich St, NYC', :title => 'Get bread', :description => 'No bread at home', :duedate => '1/9/2011')
t3 = Task.create(:address => '162 W 4th St, NYC', :title => 'Get laundry', :description => 'Dirty clothes!', :duedate => '5/2/2014')

t1.priority = p1
t1.save
t2.priority = p2
t2.save
t3.priority = p3
t3.save

u1.priorities = [p1, p2, p3, p4, p5]
u1.tasks << t1 << t2 << t3
