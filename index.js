/*
 * Contents module for D3
 * 
 * Contributors: Daniel Christopher Alves Araujo	u13073878@tuks.co.za
 * 				 Isabel Nel							isabel.nel.isabel@gmail.com
 * 				 Elzahn Botha						elzahnbotha@gmail.com
 * 				 Frikkie Snyman						frikkie.snyman@live.co.za
 * 
 */

var reporting = require('Reporting');
var resources = require('Resources');
var status = require('Status');
var threads = require('Threads');
var mongoose = require('mongoose'), ds = require('DatabaseStuff');

ds.init(mongoose);

/*
 * 
 * Reporting
 * 
 */

/**
 * Create an report by getting the thread stats.
 * @param {Function} callback - Callback function
 * @returns {object}
 */
function createReport(callback)
{
    var numEntries = getThreadStats(posts, "Num");
    var memCount = getThreadStats(posts, "MemCount");
    var maxDepth = getThreadStats(posts, "MaxDepth");
    var avgDepth = getThreadStats(posts, "AvgDepth");
    
    var returnStats = {};
    returnStats.entriesCount = numEntries;
    returnStats.memberCount = memCount;
    returnStats.maximumDepth = maxDepth;
    returnStats.averageDepth = avgDepth;
    
    callback(returnStats);
}

/**
 * Gets a thread's statistics
 * @param {object} posts - Posts in a thread
 * @param {string} action - The statistic to get
 * @param {Function} callback - Callback function
 * @returns {number}
 */
function getThreadStats(posts, action, callback)
{
	var result;
	
	reporting.getThreadStats(posts, action, function(res)
	{
		result = res;
	});
	
	console.log("Content: Reporting -- Thread stats.");
	
	callback(result);
}

/**
 * Gets a thread's appraisal
 * @param {} setOfPosts - A set of posts to get the appraisal
 * @param {} setOfMembers -
 * @param {} setOfAppraisals - 
 * @param {} actionKeyword - 
 * @param {Function} callback - Callback function
 * @returns {number}
 */
function getThreadAppraisal(setOfPosts, setOfMembers, setOfAppraisals, actionKeyword, callback)
{
	reporting.getThreadAppraisal(setOfPosts, setOfMembers, setOfAppraisals, actionKeyword, callback);
	
	console.log("Content: Reporting -- Getting thread appraisal.");
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Export a thread's appraisal
 * @param {Object} threadObject - A thread
 * @param {string} dir - Directory to export to
 * @param {string} filename - the name of the file
 * @param {Function} callback - Callback function
 */
function exportThreadAppraisal(threadObject, dir, filename, callback)
{
	reporting.exportThreadAppraisal(threadObject, dir, filename);
	
	console.log("Content: Reporting -- exporting thread appraisal.");
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Import a thread's appraisal
 * @param {string} dir - Directory to export to
 * @param {string} filename - the name of the file
 * @param {Function} callback - Callback function
 */
function importThreadAppraisal(dir, filename, callback)
{
	reporting.importThreadAppraisal(dir, filename);
	
	console.log("Content: Reporting -- importing thread appraisal.");
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Export a thread
 * @param {Object} threadObject - A thread
 * @param {string} dir - Directory to export to
 * @param {string} filename - the name of the file
 * @param {Function} callback - Callback function
 */
function exportThread(threadObject, dir, filename, callback)
{
	reporting.exportThread(threadObject, dir, filename);
	
	console.log("Content: Reporting -- exporting thread.");
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Import a thread
 * @param {string} dir - Directory to export to
 * @param {string} filename - the name of the file
 * @param {Function} callback - Callback function
 */
function importThread(dir, filename, callback)
{
	var result;
	
	reporting.importThread(dir, filename, function(res)
	{
		result = res;
	});
	
	console.log("Content: Reporting -- importing thread appraisal.");
	
	callback(result);
}



/*
 * 
 * Resources
 *  
 */

/**
 * Upload a resource to the database
 * @param {object} resource - the file to be uploaded
 * @param {string} description - a description of the file
 * @param {Function} callback - Callback funcion
 */
function uploadResources(resource, description, callback)
{
	resources.uploadResource(resource, description);
	
	console.log("Content: Resource uploaded.");
  
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Remove a resource to the database
 * @param {string} url - url of the resource to remove
 * @param {Function} callback - Callback funcion
 */
function removeResources(url, callback)
{
  resources.removeResource(url);
  
  console.log("Content: Resource removed.");
  
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Retrieve a resource from the database
 * @param {string} resourceName - Name of the resource to get
 * @param {Function} callback - Callback funcion
 */
function getResource(resourceName, callback)
{
  resources.downloadResource(resourceName);
  
  console.log("Content: Resource "  + resourceName + " retrieved");
  
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Add a type of resource that D3 can accept
 * @param {string} resourceType - The type of resource to add
 * @param {number} maxSize - The maximum size of the resource type
 * @param {Function} callback - Callback function
 */
function addResourceType(resourceType, maxSize, callback)
{
  resources.addResourceType(resourceType, maxSize);
  
  console.log("Content: Resource type added.");
  
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Remove a type of resource so that D3 will no longer accept this type of file
 * @param {string} resourceType - The type of resource to remove
 * @param {Function} callback - Callback function
 */
function removeResourceType(resourceType, callback)
{
  resources.removeResourceType(resourceType);
  console.log("Content: Resource type removed.");
  
  	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Modify an existing resource type
 * @param {string} resourceType - The type of resource to modify
 * @param {Function} callback - Callback function
 */
function modifyResourceType(resourceType, callback)
{
	// Not yet developed
	
	console.log("Content: Resource modified.");
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}



/*
 * 
 * Status
 * 
 */

var numPostsCalc = new status.statusCalculatorRequest(); // Variable used to set the status calculator if the NumPostAssessor is to be used
numPostsCalc.ProfileAssessor = status.NumPostsAssessor;

var treeDepthCalc = new status.statusCalculatorRequest(); // Variable used to set the status calculator if the ThreadDepthAssessor is to be used
treeDepthCalc.ProfileAssessor = status.ThreadsDepthAssessor;

var statusCalc = new status.statusCalculatorRequest(); // Variable used to do the status calculations
statusCalc.ProfileAssessor = status.NumPostsAssessor;

/*
 * Functions needed to access the DB
 */
//var Threads = require('./node_modules/Status/models/thread');
//var Users = require('./node_modules/Status/models/user');
//var Posts = require('./node_modules/Status/models/post');

var Threads = ds.models.thread;
var Users = ds.models.user;
var Posts = ds.models.post;

/**
 * Create an appraisal.
 * @param {String} appraisalName - the name of the appraisal
 * @param {String} appraisalDescription - the description of the appraisal
 * @param {date} activeFrom - the date the appraisal is active from
 * @param {date} activeTo - the date the appraisal is active to
 * @param {array} appraisalLevels - the array of all the level names, what each level is called, ratings per level is automatic at the moment
 * @param {Function} callback - Callback function
 */
function createApprasial(appraisalName, appraisalDescription, activeFrom, activeTo, appraisalLevels, callback)
{
	var appraisalJson = status.createAppraisal(appraisalName, appraisalDescription);
	var appraisalActive = status.activePeriod(activeFrom, activeTo);
	var appraisalLevelJson = "";
	
	for(var i = 0; i < appraisalLevels.length; i++)
	{
		appraisalLevelJson = status.addAppraisalLevel((i+1), appraisalLevels[i]);
	}
	
	clearAppraisalLevels();
	
	status.store(appraisalLevelJson);//appraisalJson, appraisalLevelJson, appraisalActive);
	
	console.log("Content: Appraisal created and stored.");
}

/**
 * Returns all appraisals one by one to the callback function
 * @param {Function} callback - the funtion to which the results are send, the next function to be called. 
 */
function getAllAppraisals(callback)
{
	status.getAllAppraisalsForVote(callback);
	console.log("Content: Getting all appraisals.")
}

/**
 * Clears the appraisalLevels array used to convert the appraisal levels into a JSON string to store the appraisal
 * @param {Function} callback - Callback function
 */
function clearAppraisalLevels(callback)
{
	status.clearAppraisalLevels();
	console.log("Content: Appraisal levels cleared.")

	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Returns the appraisals name connected to the specified post ID provided
 * @param {String} postID - The postID of the post which appraisal name is needed
 * @param {Function} callback - The function to be called after the post has been found, to which the appraisal name is send
 */
function getPostAppraisalName(postID, callback)
{
	status.getPostAppraisal(postID, callback);
}

/**
 * Sets the appraisal of the post that is specified to the appraisal given
 * @param {String} postID - The postID of the post which appraisal has to be set
 * @param {String} appraisalName - The name of the appraisal to be set
 * @param {Function} callback - Callback function
 */
function addAppraisalToPost(postID, appraisalName, callback)
{
	status.setAppraisal(postID, appraisalName);
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Save the appraisal icons
 * @param {File} file - the file to be uploaded as from the HTML file elementFromPoint
 * @parm {String} description - Description of the icon to be uploaded, used by the resources' upload function
 * @param {Function} callback - Callback function
 */
function saveIcon(file, description, callback)
{
	uploadResources(file, description, callback);
}

/**
 * Returns the status of the user, who's userID is entered as parameter, to the callback function specified
 * @parm {String} userId - userID of the user who's status is to be returned
 * @parm {Function} callback - callback function to be used once user has been found
 */
function getStatus(userId, callback)
{
	status.getStatusForProfile(userId, callback);
}

/**
 * sets The status calculator to the desired method of calculation
 * @param {String} statusCalcRequest - String used to determine the StatusRequest object containing the method of calculating the status
 * @param {Function} callback - Callback function
 */
function setStatusCalculator(statusCalcRequest, callback)
{
	var tempObj = JSON.parse(statusCalcRequest);
	
	if(tempObj == "Num Post Assessor")
	{
		statusCalc = status.setStatusCalculator(numPostsCalc);
	}
	else
	{	
		statusCalc = status.setStatusCalculator(treeDepthCalc);
	}
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Updates all users' profile status values according to a specific criteria depending on what status calculator is active
 * @param {Function} callback - Callback function
 */
function updateAllProfiles(callback)
{
	Users.find({}, function(err, user)
	{
		if(err)
		{
			console.log("ERR: " + err);
		}
		else
		{
			user.forEach(function(auser)
			{
				Threads.find({"user_id":auser.user_id}, function(err, auser)
				{
					if(err)
					{
						console.log("ERR: " + err);
					}
					else
					{
						status.assessProfile(statusCalc.ProfileAssessor, "", status.updateAllStatusPoints);
					}
				});
			});
		}
	});
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Updates specified user's profile status value according to a specific criteria depending on what status calculator is active
 * @parm {String} user - userID of the user who's status is to be updated
 * @param {Function} callback - Callback function
 */
function updateProfile(user, callback)
{
	status.assessProfile(statusCalc.ProfileAssessor, user, status.updateStatusPointsForProfile);
	
	console.log("Content: Profile update.");
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}


/*
 * 
 * Threads
 * 
 */

/**
 * Create a new thread
 * @param {String} user - The user creating a new thread
 * @param {String} title - The title of the thread
 * @param {String} content - The content of the first post
 * @param {String} postType - The type of post being submitted
 * @param {String} subject - The subject of the post
 * @param {Function} callback - Callback function
 */
function createNewThread(user, title, content, postType, subject, callback)
{
  var dateTime = new Date(); //Get the current date and time to store in the thread object
  var LEVEL = 0; // Default level value of 0
  var PARENT = null; // Default parent value of null
  var MIMETYPE = "text/plain";
  var newThread = new threads(user, PARENT, LEVEL, postType, title, content, MIMETYPE, subject);
  newThread.createNewThread();
  console.log("Content: Thread created.");
   
  callback(newThread);
}

/**
 * Submit a new post to a thread
 * @param {object} threadObject - A thread to submit post to
 * @param {number} id - The id of the post
 * @param {String} user - The user creating a new post
 * @param {String} postType - The type of post being submitted
 * @param {String} heading - Heading of the post
 * @param {String} content - The content of the first post
 * @param {Function} callback - Callback function
 */
function newPost(threadObject, id, user, postType, heading, content, callback)
{
	var MIMETYPE = "text/plain";
	
	threadObject.submitPost(id, user, postType, heading, content, MIMETYPE);
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Close the thread
 * @param {object} threadObject - A thread to close
 * @param {Function} callback - Callback function
 */
function closeThread(threadObject, callback)
{
	threadObject.closeThread();
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}

/**
 * Close the thread
 * @param {object} threadObject - A thread to unfreeze
 * @param {Function} callback - Callback function
 */
function unfreezeThread(threadObject, callback)
{
	threadObject.unfreeze();
	
	if(typeof callback !== 'undefined')
	{
		callback();
	}
}


/*
 * Accessor functions
 */ 

/**
 * Accessor to get status from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getStatusFromThread(threadObject, callback)
{
	var result = threadObject.getStatus();
	
	console.log("Content: Got status from a thread");
	
	callback(result);
}

/**
 * Accessor to get the children from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getChildrenFromThread(threadObject, callback)
{
	var result = threadObject.getChildren();
	
	console.log("Content: Got children from a thread");
	
	callback(result);
}

/**
 * Accessor to get the post type from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getPostTypeFromThread(threadObject, callback)
{
	var result = threadObject.getStatus();
	
	console.log("Content: Got post type from a thread");
	
	callback(result);
}

/**
 * Accessor to get the heading from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getHeadingFromThread(threadObject, callback)
{
	var result = threadObject.getHeading();
	
	console.log("Content: Got heading from a thread");
	
	callback(result);
}

/**
 * Accessor to get the content from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getContentFromThread(threadObject, callback)
{
	var result = threadObject.getContent();
	
	console.log("Content: Got content from a thread");
	
	callback(result);
}

/**
 * Accessor to get the date-time from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getDateTimeFromThread(threadObject, callback)
{
	var result = threadObject.getDateTime();
	
	console.log("Content: Got datetime from a thread");
	
	callback(result);
}

/**
 * Accessor to get the MIME type from a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getMIMETypeFromThread(threadObject, callback)
{
	var result = threadObject.getMimeType();
	
	console.log("Content: Got MIMEType from a thread");
	
	callback(result);
}

/**
 * Accessor to get the children of a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getChildThreadsFromThread(threadObject, callback)
{
	var result = threadObject.getChildThreads();
	
	console.log("Content: Got child threads from a thread");
	
	callback(result);
}

/**
 * Accessor to get the post of a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getPostFromThread(threadObject, callback)
{
	var result = threadObject.getPost();
	
	console.log("Content: Got post from a thread");
	
	callback(result);
}

/**
 * Accessor to get the parent of a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getParentFromThread(threadObject, callback)
{
	var result = threadObject.getParentThread();
	
	console.log("Content: Got parent thread from a thread");
	
	callback(result);
}

/**
 * Accessor to get the root of a thread
 * @param {object} threadObject - A thread to aquire details from
 * @param {Function} callback - Callback function
 */
function getRootFromThread(threadObject, callback)
{
	var result = threadObject.getRoot();
	
	console.log("Content: Got root from a thread");
	
	callback(result);
}

/////////////////////////////////////////////
/*
 * 
 * Function exports
 *  
 */
///////////////////////////////////////////

// Reporting

module.exports.createReport = createReport;

module.exports.getThreadStats = getThreadStats;

module.exports.getThreadAppraisal = getThreadAppraisal;

module.exports.exportThreadAppraisal = exportThreadAppraisal;

module.exports.importThreadAppraisal = importThreadAppraisal;

module.exports.exportThread = exportThread;

module.exports.importThread = importThread;


// Resources

module.exports.uploadResources = uploadResources;

module.exports.removeResources = removeResources;

module.exports.getResource = getResource;

module.exports.addResourceType = addResourceType;

module.exports.removeResourceType = removeResourceType;

module.exports.modifyResourceType = modifyResourceType;

// Status

module.exports.createApprasial = createApprasial;

module.exports.getAllAppraisals = getAllAppraisals;

module.exports.clearAppraisalLevels = clearAppraisalLevels;

module.exports.getPostAppraisalName = getPostAppraisalName;

module.exports.addAppraisalToPost = addAppraisalToPost;

module.exports.saveIcon = saveIcon;

module.exports.getStatus = getStatus;

module.exports.setStatusCalculator = setStatusCalculator;

module.exports.updateAllProfiles = updateAllProfiles;

module.exports.updateProfile = updateProfile;

// Threads

module.exports.createNewThread = createNewThread;

module.exports.newPost = newPost;

module.exports.closeThread = closeThread;

module.exports.unfreezeThread = unfreezeThread;

module.exports.getStatusFromThread = getStatusFromThread;

module.exports.getChildrenFromThread = getChildrenFromThread;

module.exports.getPostTypeFromThread = getPostTypeFromThread;

module.exports.getHeadingFromThread = getHeadingFromThread;

module.exports.getContentFromThread = getContentFromThread;

module.exports.getDateTimeFromThread = getDateTimeFromThread;

module.exports.getMIMETypeFromThread = getMIMETypeFromThread;

module.exports.getChildThreadsFromThread = getChildThreadsFromThread;

module.exports.getPostFromThread = getPostFromThread;

module.exports.getParentFromThread = getParentFromThread;

module.exports.getRootFromThread = getRootFromThread;

