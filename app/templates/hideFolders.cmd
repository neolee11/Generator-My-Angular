::Make certain folder hidden so they don't get checked in to the TFS

@ECHO OFF

call:hideFolder node_modules
call:hideFolder bower_components
call:hideFolder tmp
call:hideFolder build
call:hideFolder report
call:hideFolder .idea
goto:eof

:hideFolder 	
IF EXIST %~1 (	
	attrib %~1 +h
	echo Folder '%~1' already exists, made it hidden
) ELSE (	
	mkdir %~1
	attrib %~1 +h
	echo Created folder '%~1', and made it hidden
)
goto:eof
